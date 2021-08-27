import {
  FormControl,
  FormHelperText,
  FormLabel,
  Switch,
  SwitchProps
} from '@chakra-ui/react';
import React, { forwardRef } from 'react';

export interface InputFileProps extends SwitchProps {
  readonly id?: string;
  readonly label?: string;
  readonly helperMessage?: string;
  readonly errorMessage?: string;
}

export const InputSwitch: React.FC<InputFileProps> = forwardRef(
  ({ label, helperMessage, errorMessage, ...props }, ref) => {
    return (
      <FormControl
        id={props.id}
        marginBottom={2}
        display="flex"
        alignItems="center"
      >
        {label && (
          <FormLabel htmlFor={props.id + '-switch'} mb="0">
            {label}
          </FormLabel>
        )}

        <Switch id={props.id + '-switch'} colorScheme="green" {...props} />

        {errorMessage && (
          <FormHelperText color="red.500">{errorMessage}</FormHelperText>
        )}

        {helperMessage && <FormHelperText>{helperMessage}</FormHelperText>}
      </FormControl>
    );
  }
);
InputSwitch.displayName = 'InputSwitch';
