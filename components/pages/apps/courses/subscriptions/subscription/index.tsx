import { Badge, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { memo, useContext, useEffect, useMemo } from 'react';
import { Card } from '~/components/ui/card';
import { UserAvatar } from '~/components/ui/user-avatar';
import { CourseContext } from '~/contexts/course';
import { useRequest } from '~/hooks/use-request';
import { SubscriptionModel } from '~/services/@types/subscription';
import { CourseSubscriptionServiceRest } from '~/services/rest-api/services/course-subscription/course-subscription.service';
import { colors } from '~/styles/colors';
import { differenceDate, formatDate } from '~/utils/format-date';

interface Props {
  readonly subscription: SubscriptionModel;
}

const times = {
  day: {
    singular: 'dia',
    plural: 'dias'
  },
  week: {
    singular: 'semana',
    plural: 'semanas'
  },
  month: {
    singular: 'mês',
    plural: 'meses'
  },
  year: {
    singular: 'ano',
    plural: 'anos'
  }
};

const subscriptionStatus = {
  finished: {
    text: 'Finalizado',
    color: 'gray'
  },
  available: {
    text: 'Ativa',
    color: 'green'
  },
  pending: {
    text: 'Pendente',
    color: 'orange'
  },
  canceled: {
    text: 'Cancelada',
    color: 'red'
  }
};

const typeObj = {
  permanent: {
    color: colors.primary.main,
    text: 'VITALÍCIO'
  },
  recurring: {
    color: 'teal',
    text: 'RECORRENTE'
  }
};

export const Subscription: React.FC<Props> = memo(({ subscription }) => {
  const router = useRouter();
  const { app, course } = useContext(CourseContext);

  const courseSubscriptionService = new CourseSubscriptionServiceRest({
    appId: app?.id,
    courseId: course?.id
  });

  const {
    loading: loadingCancelSubscription,
    data: dataCancelSubscription,
    submit: submitCancelSubscription
  } = useRequest({
    submit: () =>
      courseSubscriptionService.cancel({
        userId: subscription?.user?.id,
        subscriptionId: subscription?.id
      })
  });

  useEffect(() => {
    if (dataCancelSubscription) {
      router.reload();
    }
  }, [router, dataCancelSubscription]);

  const isAvailableToCancel = useMemo(() => {
    return (
      subscription?.status === 'available' || subscription?.status === 'pending'
    );
  }, [subscription]);

  const status: {
    text: string;
    color: string;
  } = useMemo(() => {
    return (
      subscriptionStatus[subscription.status] || subscriptionStatus.pending
    );
  }, [subscription.status]);

  const type: {
    color: string;
    text: string;
  } = useMemo(() => {
    return typeObj[subscription.type] || typeObj.permanent;
  }, [subscription.type]);

  const timeFormatted = useMemo(() => {
    const time: {
      singular: string;
      plural: string;
    } = times[subscription?.recurring?.type] || times.day;
    const interval = subscription?.recurring?.interval;
    return `${interval} ${interval === 1 ? time.singular : time.plural}`;
  }, [subscription.recurring]);

  const startAtFormatted = useMemo(() => {
    if (!subscription.startAt) {
      return 'Não iniciado';
    }
    return formatDate(subscription.startAt);
  }, [subscription.startAt]);

  const endAtFormatted = useMemo(() => {
    if (!subscription.endAt) {
      return 'Não iniciado';
    }
    return formatDate(subscription.endAt);
  }, [subscription.endAt]);

  const addedAtFormatted = useMemo(() => {
    return formatDate(subscription.createdAt);
  }, [subscription.createdAt]);

  const daysToFinish = useMemo(() => {
    if (!subscription.endAt) {
      return timeFormatted;
    }
    const now = new Date(Date.now()).toISOString();
    const end = new Date(subscription.endAt);
    return differenceDate(now, end.toISOString());
  }, [subscription.endAt, timeFormatted]);

  return (
    <Card
      position="relative"
      title={subscription?.user?.fullname}
      menu={
        isAvailableToCancel && [
          {
            text: 'Cancelar',
            color: 'red.500',
            loading: loadingCancelSubscription,
            loadingText: 'Carregando...',
            onClick: () =>
              !loadingCancelSubscription && submitCancelSubscription()
          }
        ]
      }
      subtitle={<Badge colorScheme={status.color}>{status.text}</Badge>}
      avatar={
        <UserAvatar
          src={subscription?.user?.avatar}
          name={subscription?.user?.fullname}
          size="md"
        />
      }
      body={
        <Flex flexDir="column">
          {subscription.type !== 'permanent' && (
            <>
              {subscription.status === 'available' && daysToFinish && (
                <Text fontSize="sm">
                  <b>Expira em:</b> {daysToFinish}
                </Text>
              )}
              {subscription.recurring && (
                <Text fontSize="sm">
                  <b>Tempo total:</b> {timeFormatted}
                </Text>
              )}
            </>
          )}

          <Text fontSize="sm">
            <b>Inicio:</b> {startAtFormatted}
          </Text>
          {subscription.type !== 'permanent' && (
            <Text fontSize="sm">
              <b>Fim:</b> {endAtFormatted}
            </Text>
          )}
          {subscription.createdAt && (
            <Text fontSize="sm">
              <b>Adicionado:</b> {addedAtFormatted}
            </Text>
          )}
        </Flex>
      }
      footer={
        subscription.type === 'permanent' && (
          <Flex>
            <Badge
              paddingY={1}
              paddingX={7}
              color="white"
              backgroundColor={type.color}
            >
              {type.text}
            </Badge>
          </Flex>
        )
      }
    />
  );
});
Subscription.displayName = 'Subscription';
