import {
  FormControl,
  FormHelperText,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputProps as ChakraNumberInputProps,
  NumberInputStepper,
  Text
} from '@chakra-ui/react';
import React from 'react';

interface Props extends ChakraNumberInputProps {
  readonly label?: string;
  readonly required?: boolean;
  readonly helperMessage?: string;
  readonly errorMessage?: string;
}

export const InputNumber: React.FC<Props> = ({
  label,
  width,
  required = true,
  helperMessage,
  errorMessage,
  ...props
}) => {
  return (
    <FormControl id={props.id} marginBottom={2} width={width}>
      {label && (
        <FormLabel>
          {label}
          {!required && (
            <Text as="span" marginLeft={3} color="gray.500" fontWeight="normal">
              (Opcional)
            </Text>
          )}
        </FormLabel>
      )}

      <ChakraNumberInput
        size="md"
        backgroundColor="white"
        _hover={{
          borderColor: 'green.600'
        }}
        focusBorderColor="green.600"
        borderRadius="sm"
        allowMouseWheel
        width={width}
        {...props}
      >
        <NumberInputField
          borderColor="black"
          borderRadius="sm"
          _hover={{
            borderColor: 'black'
          }}
        />
        <NumberInputStepper borderColor="black">
          <NumberIncrementStepper borderColor="black" />
          <NumberDecrementStepper borderColor="black" />
        </NumberInputStepper>
      </ChakraNumberInput>
      {errorMessage && (
        <FormHelperText color="red.500">{errorMessage}</FormHelperText>
      )}

      {helperMessage && <FormHelperText>{helperMessage}</FormHelperText>}
    </FormControl>
  );
};
