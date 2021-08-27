import { Badge, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { memo, useContext, useEffect, useMemo } from 'react';
import { ButtonOutlined } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { AlertsContext } from '~/contexts/alerts';
import { AppContext } from '~/contexts/app';
import { useStartSubscription } from '~/hooks/use-start-subscription';
import { SubscriptionModel } from '~/services/@types/subscription';
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

const statusObj = {
  pending: {
    colorScheme: 'orange',
    text: 'Pendente'
  },
  canceled: {
    colorScheme: 'red',
    text: 'Cancelado'
  },
  available: {
    colorScheme: 'green',
    text: 'Disponivel'
  },
  finished: {
    colorScheme: 'blue',
    text: 'Finalizado'
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
  const { addAlert } = useContext(AlertsContext);
  const { app } = useContext(AppContext);

  const {
    loading: loadingStart,
    data: dataStart,
    error: errorStart,
    submit: startSubscription
  } = useStartSubscription({
    subscriptionId: subscription?.id,
    appId: app?.id
  });

  useEffect(() => {
    try {
      if (dataStart) {
        addAlert({
          text: 'Iniciado com sucesso!',
          status: 'success'
        });
        router.reload();
      } else if (errorStart) {
        addAlert({
          text: 'Erro ao iniciar a assinatura!',
          status: 'error'
        });
      }
    } catch (error) {}
  }, [dataStart, errorStart, addAlert, router]);

  const status: {
    colorScheme: string;
    text: string;
  } = useMemo(() => {
    return statusObj[subscription.status] || statusObj.pending;
  }, [subscription.status]);

  const type: {
    color: string;
    text: string;
  } = useMemo(() => {
    return typeObj[subscription.type] || typeObj.permanent;
  }, [subscription.type]);

  const timeFormatted = useMemo(() => {
    if (!subscription?.recurring) {
      return;
    }
    const time: {
      singular: string;
      plural: string;
    } = times[subscription?.recurring?.type] || times.day;
    const interval = subscription?.recurring?.interval;
    return `${interval} ${interval === 1 ? time.singular : time.plural}`;
  }, [subscription?.recurring]);

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
      width="full"
      overflow="hidden"
      title={
        <Flex width="full" flexDir="column">
          <Heading size="md" color={colors.primary.main} lineHeight="shorter">
            {subscription?.product?.name ||
              subscription?.product?.data?.name ||
              subscription?.product?.data?.title}
          </Heading>
          <Flex>
            <Badge
              marginTop="2"
              paddingY="2px"
              paddingX="8px"
              colorScheme={status.colorScheme}
            >
              {status.text}
            </Badge>
          </Flex>
        </Flex>
      }
      body={
        <Flex flexDir="column">
          {subscription.type === 'permanent' ? (
            <Badge
              position="absolute"
              top={4}
              right={-7}
              paddingY={1}
              paddingX={7}
              transform={'rotate(45deg)'}
              color="white"
              backgroundColor={type.color}
            >
              {type.text}
            </Badge>
          ) : (
            <>
              {subscription.status === 'available' && daysToFinish && (
                <Text fontSize="sm">
                  <b>Expira em:</b> {daysToFinish}
                </Text>
              )}
              {timeFormatted && (
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
        subscription?.status === 'pending' && (
          <Stack
            alignItems="center"
            direction={['column-reverse', 'column-reverse', 'row', 'row']}
            spacing={5}
          >
            <ButtonOutlined
              isLoading={loadingStart}
              loadingText="Iniciando"
              onClick={() => startSubscription()}
            >
              Iniciar
            </ButtonOutlined>
          </Stack>
        )
      }
    />
  );
});

Subscription.displayName = 'Subscription';
