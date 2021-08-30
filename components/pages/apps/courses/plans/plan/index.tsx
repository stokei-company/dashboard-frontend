import {
  Badge,
  Flex,
  Heading,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { memo, useEffect, useMemo } from 'react';
import { ButtonOutlined } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { useRequest } from '~/hooks/use-request';
import { useSkuPrices } from '~/hooks/use-sku-prices';
import { SkuModel } from '~/services/@types/sku';
import { CourseSkuServiceRest } from '~/services/rest-api/services/course-sku/course-sku.service';
import { colors } from '~/styles/colors';
import { convertToMoney } from '~/utils/convert-to-money';
import { UpdatePlan } from '../update-plan';

interface Props {
  readonly appId: string;
  readonly courseId: string;
  readonly plan: SkuModel;
}

const status = {
  canceled: {
    color: 'red',
    text: 'Cancelado'
  },
  available: {
    color: 'green',
    text: 'Ativo'
  },
  paused: {
    color: 'teal',
    text: 'Pausado'
  }
};

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

export const Plan: React.FC<Props> = memo(({ plan, courseId, appId }) => {
  const router = useRouter();
  const refUpdatePlan = React.useRef();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const courseSkuService = new CourseSkuServiceRest({
    appId,
    courseId
  });

  const { prices, loading: loadingPrices } = useSkuPrices({
    appId,
    skuId: plan.id
  });

  const {
    loading: loadingRemove,
    data: dataRemove,
    submit: remove
  } = useRequest({
    submit: () => courseSkuService.delete(plan?.id)
  });

  const {
    loading: loadingStart,
    data: dataStart,
    submit: start
  } = useRequest({
    submit: () => courseSkuService.start(plan?.id)
  });

  const {
    loading: loadingPause,
    data: dataPause,
    submit: pause
  } = useRequest({
    submit: () => courseSkuService.pause(plan?.id)
  });

  const recurring = useMemo(() => {
    const time: {
      singular: string;
      plural: string;
    } = times[plan.recurring.type] || times.day;
    if (plan.type === 'permanent') {
      return 'VITALÍCIO';
    }
    const interval = plan.recurring.interval;
    return `${interval} ${interval === 1 ? time.singular : time.plural}`;
  }, [plan]);

  const statusFormatted = useMemo(() => {
    const response: {
      color: string;
      text: string;
    } = status[plan.status] || status.canceled;
    return response;
  }, [plan]);

  useEffect(() => {
    if (dataRemove || dataPause || dataStart) {
      router.reload();
    }
  }, [dataRemove, dataPause, dataStart, router]);

  return (
    <Card
      title={
        <Stack width="full" direction="row" alignItems="center" spacing="3">
          <Heading size="md" color={colors.primary.main} lineHeight="shorter">
            {plan.name}
          </Heading>

          <Badge colorScheme={statusFormatted.color}>
            {statusFormatted.text}
          </Badge>
        </Stack>
      }
      menu={
        plan.status !== 'canceled' && [
          {
            text: 'Alterar',
            onClick: () => onOpen()
          },
          {
            color: 'red.500',
            text: 'Cancelar',
            loading: loadingRemove,
            loadingText: 'Cancelando...',
            onClick: () => !loadingRemove && remove()
          }
        ]
      }
      body={
        <>
          <Flex width="full" flexDir="column">
            <Flex>
              <Text>
                <b>Tempo:</b> {recurring}
              </Text>
            </Flex>
            <Flex>
              <Text>
                <b>Estoque:</b>{' '}
                {plan.inventory.type === 'infinite' ? 'Infinito' : 'Finito'}
              </Text>
            </Flex>
            {plan.inventory.type !== 'infinite' && (
              <Flex>
                <Text>
                  <b>Quantidade disponível:</b> {plan.inventory.quantity}
                </Text>
              </Flex>
            )}
            <Flex width="full" flexDir="column">
              <UpdatePlan
                firstField={refUpdatePlan}
                isOpen={isOpen}
                onClose={onClose}
                onSuccess={() => router.reload()}
                appId={appId}
                plan={plan}
              />
              {loadingPrices && <Text fontSize="sm">Buscando preços...</Text>}

              {!loadingPrices &&
                prices &&
                prices.length &&
                prices.map((price) => (
                  <Flex width="full" key={price.id} alignItems="flex-end">
                    <Stack direction="row" alignItems="center">
                      <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        color={colors.primary.main}
                      >
                        {convertToMoney(price?.amount, price?.currency)}
                      </Text>
                      {price?.fromAmount && (
                        <Text fontSize="sm" color="gray.800">
                          <del>
                            {convertToMoney(price?.fromAmount, price?.currency)}
                          </del>
                        </Text>
                      )}
                      {price.discount && (
                        <Badge colorScheme="yellow">
                          {price.discount.name}
                        </Badge>
                      )}
                    </Stack>
                  </Flex>
                ))}

              {plan.status === 'available' && (
                <Flex width="full" marginTop={3}>
                  <ButtonOutlined
                    isLoading={loadingPause}
                    loadingText="Pausando..."
                    onClick={() => pause()}
                  >
                    Pausar
                  </ButtonOutlined>
                </Flex>
              )}
              {plan.status === 'paused' && (
                <Flex width="full" marginTop={3}>
                  <ButtonOutlined
                    isLoading={loadingStart}
                    loadingText="Ativando..."
                    onClick={() => start()}
                  >
                    Ativar
                  </ButtonOutlined>
                </Flex>
              )}
            </Flex>
          </Flex>
        </>
      }
    />
  );
});
