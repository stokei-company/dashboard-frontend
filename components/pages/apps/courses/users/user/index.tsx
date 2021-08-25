import { Badge, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { memo, useContext, useEffect, useMemo } from "react";
import { Card } from "~/components/ui/card";
import { UserAvatar } from "~/components/ui/user-avatar";
import { CourseContext } from "~/contexts/course";
import { useRequest } from "~/hooks/use-request";
import { SubscriptionModel } from "~/services/@types/subscription";
import { CourseUserServiceRest } from "~/services/rest-api/services/course-user/course-user.service";
import { differenceDate, formatDate } from "~/utils/format-date";

interface Props {
  readonly user: SubscriptionModel;
}

const times = {
  day: {
    singular: "dia",
    plural: "dias",
  },
  week: {
    singular: "semana",
    plural: "semanas",
  },
  month: {
    singular: "mês",
    plural: "meses",
  },
  year: {
    singular: "ano",
    plural: "anos",
  },
};

const subscriptionStatus = {
  finished: {
    text: "Finalizado",
    color: "gray",
  },
  available: {
    text: "Ativa",
    color: "green",
  },
  pending: {
    text: "Pendente",
    color: "orange",
  },
  canceled: {
    text: "Cancelada",
    color: "red",
  },
};

export const User: React.FC<Props> = memo(({ user }) => {
  const router = useRouter();
  const { app, course } = useContext(CourseContext);

  const courseUserService = new CourseUserServiceRest({
    appId: app?.id,
    courseId: course?.id,
  });

  const {
    loading: loadingCancelSubscription,
    data: dataCancelSubscription,
    submit: submitCancelSubscription,
  } = useRequest({
    submit: () =>
      courseUserService.cancel({
        userId: user?.user?.id,
        subscriptionId: user?.id,
      }),
  });

  useEffect(() => {
    if (dataCancelSubscription) {
      router.reload();
    }
  }, [router, dataCancelSubscription]);

  const isAvailableToCancel = useMemo(() => {
    return user?.status === "available" || user?.status === "pending";
  }, [user]);

  const status: {
    text: string;
    color: string;
  } = useMemo(() => {
    return subscriptionStatus[user.status] || subscriptionStatus.pending;
  }, [user.status]);

  const timeFormatted = useMemo(() => {
    const time: {
      singular: string;
      plural: string;
    } = times[user?.recurring?.type] || times.day;
    const interval = user?.recurring?.interval;
    return `${interval} ${interval === 1 ? time.singular : time.plural}`;
  }, [user.recurring]);

  const startAtFormatted = useMemo(() => {
    if (!user.startAt) {
      return "Não iniciado";
    }
    return formatDate(user.startAt);
  }, [user.startAt]);

  const endAtFormatted = useMemo(() => {
    if (!user.endAt) {
      return "Não iniciado";
    }
    return formatDate(user.endAt);
  }, [user.endAt]);

  const addedAtFormatted = useMemo(() => {
    return formatDate(user.createdAt);
  }, [user.createdAt]);

  const daysToFinish = useMemo(() => {
    if (!user.endAt) {
      return timeFormatted;
    }
    const now = new Date(Date.now()).toISOString();
    const end = new Date(user.endAt);
    return differenceDate(now, end.toISOString());
  }, [user.endAt, timeFormatted]);

  return (
    <Card
      position="relative"
      title={user?.user?.fullname}
      menu={
        isAvailableToCancel && [
          {
            text: "Cancelar",
            color: "red.500",
            loading: loadingCancelSubscription,
            loadingText: "Carregando...",
            onClick: () =>
              !loadingCancelSubscription && submitCancelSubscription(),
          },
        ]
      }
      subtitle={<Badge colorScheme={status.color}>{status.text}</Badge>}
      avatar={
        <UserAvatar
          src={user?.user?.avatar}
          name={user?.user?.fullname}
          size="md"
        />
      }
      body={
        <Flex flexDir="column">
          {user.status === "available" && daysToFinish && (
            <Text fontSize="sm">
              <b>Expira em:</b> {daysToFinish}
            </Text>
          )}
          {user.recurring && (
            <Text fontSize="sm">
              <b>Tempo total:</b> {timeFormatted}
            </Text>
          )}
          <Text fontSize="sm">
            <b>Inicio:</b> {startAtFormatted}
          </Text>
          <Text fontSize="sm">
            <b>Fim:</b> {endAtFormatted}
          </Text>
          {user.createdAt && (
            <Text fontSize="sm">
              <b>Adicionado:</b> {addedAtFormatted}
            </Text>
          )}
        </Flex>
      }
    />
  );
});
User.displayName = "User";
