import { colors } from '~/styles/colors';

export const generateRandomColor = () => {
  const listColors = [
    '#E53E3E',
    '#ED8936',
    '#ECC94B',
    '#48BB78',
    '#319795',
    '#38B2AC',
    '#4299E1',
    '#00B5D8',
    '#805AD5',
    '#D53F8C',
    colors.primary.mainHex
  ];
  let num = Math.floor(Math.random() * listColors.length + 1);
  return listColors[num];
};
