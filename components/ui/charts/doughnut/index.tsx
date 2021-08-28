import { Flex, Heading } from '@chakra-ui/react';
import { ChartData } from 'chart.js';
import React, { memo, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { chakraColors } from '~/styles/colors';
import { generateRandomColor } from '~/utils/generate-random-color';

export interface ChartDoughnutData {
  readonly label: string;
  readonly value: number;
}

export interface ChartDoughnutProps {
  readonly title: string;
  readonly data: ChartDoughnutData[];
}

export const ChartDoughnut: React.FC<ChartDoughnutProps> = memo(
  ({ title, data, ...props }) => {
    const dataFormatted: ChartData = useMemo(() => {
      const labels = (data || []).map((item) => item.label);
      const values = (data || []).map((item) => item.value);
      const bgColors: string[] = Array.from(
        { length: values.length },
        (_, i) => i
      ).map((item) => chakraColors[item] || generateRandomColor());
      return {
        labels,
        datasets: [
          {
            label: title,
            data: values,
            backgroundColor: bgColors,
            hoverBackgroundColor: bgColors,
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
          <Doughnut
            data={dataFormatted}
            options={{
              plugins: {
                legend: {
                  position: 'right'
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

ChartDoughnut.displayName = 'ChartDoughnut';
