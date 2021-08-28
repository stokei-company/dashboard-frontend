import { Flex, Heading } from '@chakra-ui/react';
import { ChartData } from 'chart.js';
import React, { memo, useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { chakraColors } from '~/styles/colors';
import { generateRandomColor } from '~/utils/generate-random-color';

export interface ChartPieData {
  readonly label: string;
  readonly value: number;
}

export interface ChartPieProps {
  readonly title: string;
  readonly hideLabels?: boolean;
  readonly data: ChartPieData[];
}

export const ChartPie: React.FC<ChartPieProps> = memo(
  ({ title, data, hideLabels = false, ...props }) => {
    const dataFormatted: ChartData = useMemo(() => {
      let labels = [];
      if (!hideLabels) {
        labels = (data || []).map((item) => item.label);
      }
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
    }, [hideLabels, title, data]);
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
          <Pie
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
ChartPie.displayName = 'ChartPie';
