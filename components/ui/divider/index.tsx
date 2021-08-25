import React from 'react';
import { Divider as ChakraDivider, Grid } from '@chakra-ui/react'

// import { Container } from './styles';

export const Divider: React.FC = () => {
  return (
    <Grid
      gridTemplateColumns="1fr 1fr"
      columnGap={12}
      opacity={0.4}
    >
      <ChakraDivider marginY={4} />
      <ChakraDivider marginY={4} />
    </Grid>
  );
}

export default Divider;