import {
  FormControl,
  FormHelperText,
  FormLabel,
  Text,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps
} from '@chakra-ui/react';
import React from 'react';

interface Props extends ChakraTextareaProps {
  readonly label?: string;
  readonly required?: boolean;
  readonly helperMessage?: string;
  readonly errorMessage?: string;
}

export const Textarea: React.FC<Props> = ({
  label,
  required = true,
  helperMessage,
  errorMessage,
  ...props
}) => {
  return (
    <FormControl id={props.id} marginBottom={2}>
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

      <ChakraTextarea
        backgroundColor="white"
        _hover={{
          borderColor: 'green.600'
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
