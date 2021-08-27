import { Flex, Heading } from '@chakra-ui/react';
import { ChartData } from 'chart.js';
import React, { memo } from 'react';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { colors } from '~/styles/colors';

export interface ChartBarData {
  readonly label: string;
  readonly value: number;
}

export interface ChartBarProps {
  readonly title: string;
  readonly data: ChartBarData[];
}

export const ChartBar: React.FC<ChartBarProps> = memo(
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
            backgroundColor: [colors.primary.mainHex],
            hoverBackgroundColor: [colors.primary.lightHex],
            borderWidth: 0
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
          <Bar
            data={dataFormatted}
            options={{
              maintainAspectRatio: false
            }}
          />
        </Flex>
      </Flex>
    );
  }
);
ChartBar.displayName = 'ChartBar';
