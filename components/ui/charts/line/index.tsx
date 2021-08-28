import { Flex, Heading } from '@chakra-ui/react';
import { ChartData } from 'chart.js';
import React, { memo } from 'react';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { colors } from '~/styles/colors';

export interface ChartLineData {
  readonly label: string;
  readonly value: number;
}

export interface ChartLineProps {
  readonly title: string;
  readonly data: ChartLineData[];
}

export const ChartLine: React.FC<ChartLineProps> = memo(
  ({ title, data, ...props }) => {
    const dataFormatted: ChartData = useMemo(() => {
      const labels = (data || []).map((item) => item.label);
      const values = (data || []).map((item) => item.value);
      return {
        labels,
        datasets: [
          {
            label: title,
            data: values,
            backgroundColor: colors.primary.mainHex,
            hoverBackgroundColor: colors.primary.lightHex,
            fill: false,
            lineTension: 0.1,
            borderColor: colors.primary.mainHex,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: colors.primary.mainHex,
            pointBackgroundColor: colors.primary.mainHex,
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: colors.primary.mainHex,
            pointHoverBorderColor: colors.primary.mainHex,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10
          }
        ]
      };
    }, [title, data]);
    return (
      <Flex width="full" flexDirection="column">
        {title && (
          <Flex width="full" marginBottom={3}>
            <Heading fontSize="lg" lineHeight="shorter">
              {title}
            </Heading>
          </Flex>
        )}
        <Flex width="full">
          <Line
            data={dataFormatted}
            options={{
              plugins: {
                title: {
                  display: false
                }
              },
              maintainAspectRatio: false
            }}
          />
        </Flex>
      </Flex>
    );
  }
);
ChartLine.displayName = 'ChartLine';
