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
} from "@chakra-ui/react";
import React from "react";

interface Props extends ChakraNumberInputProps {
  readonly label?: string;
  readonly helperMessage?: string;
  readonly errorMessage?: string;
}

export const NumberInput: React.FC<Props> = ({
  label,
  helperMessage,
  errorMessage,
  ...props
}) => {
  return (
    <FormControl id={props.id} marginBottom={2}>
      {label && <FormLabel>{label}</FormLabel>}

      <ChakraNumberInput
        size="md"
        backgroundColor="white"
        _hover={{
          borderColor: "green.600",
        }}
        focusBorderColor="green.600"
        borderRadius="sm"
        allowMouseWheel
        {...props}
      >
        <NumberInputField
          borderColor="black"
          borderRadius="sm"
          _hover={{
            borderColor: "black",
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
