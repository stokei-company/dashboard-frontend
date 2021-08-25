import {
  FormControl,
  FormHelperText,
  FormLabel,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
} from "@chakra-ui/react";
import React from "react";

interface Props extends ChakraTextareaProps {
  readonly label?: string;
  readonly helperMessage?: string;
  readonly errorMessage?: string;
}

export const Textarea: React.FC<Props> = ({
  label,
  helperMessage,
  errorMessage,
  ...props
}) => {
  return (
    <FormControl id={props.id} marginBottom={2}>
      {label && <FormLabel>{label}</FormLabel>}

      <ChakraTextarea
        backgroundColor="white"
        _hover={{
          borderColor: "green.600",
        }}
        focusBorderColor="green.600"
        borderRadius="sm"
        resize="none"
        size="sm"
        {...props}
      />

      {errorMessage && (
        <FormHelperText color="red.500">{errorMessage}</FormHelperText>
      )}

      {helperMessage && <FormHelperText>{helperMessage}</FormHelperText>}
    </FormControl>
  );
};

export default Textarea;
