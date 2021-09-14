import {
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
  InputRightElement,
  Stack,
  Text
} from '@chakra-ui/react';
import React, {
  ChangeEvent,
  forwardRef,
  ReactNode,
  useRef,
  useState
} from 'react';
import {
  EmailIcon,
  PasswordHideIcon,
  PasswordShowIcon
} from '~/components/icons';
import { clearPhone, formatPhone } from '~/utils/format-phone';
import Select from '../select';

export interface InputProps extends ChakraInputProps {
  readonly ref?: any;
  readonly label?: string;
  readonly required?: boolean;
  readonly leftElement?: ReactNode;
  readonly rightElement?: ReactNode;
  readonly helperMessage?: string;
  readonly errorMessage?: string;
}

export const Input: React.FC<InputProps> = forwardRef(
  (
    {
      width,
      label,
      required = true,
      leftElement,
      rightElement,
      helperMessage,
      errorMessage,
      ...props
    },
    ref
  ) => {
    return (
      <FormControl id={props.id} marginBottom={2} width={width}>
        {label && (
          <FormLabel>
            {label}
            {!required && (
              <Text
                as="span"
                marginLeft={3}
                color="gray.500"
                fontWeight="normal"
              >
                (Opcional)
              </Text>
            )}
          </FormLabel>
        )}

        <InputGroup>
          {leftElement && (
            <InputLeftElement
              height="full"
              alignItems="center"
              justifyContent="center"
            >
              {leftElement}
            </InputLeftElement>
          )}
          <ChakraInput
            ref={ref || props.ref}
            width={width}
            height="50px"
            minHeight="50px"
            backgroundColor="white"
            _hover={{
              borderColor: 'green.600'
            }}
            focusBorderColor="green.600"
            borderRadius="sm"
            {...props}
          />
          {rightElement && (
            <InputRightElement
              height="full"
              alignItems="center"
              justifyContent="center"
            >
              {rightElement}
            </InputRightElement>
          )}
        </InputGroup>

        {errorMessage && (
          <FormHelperText color="red.500">{errorMessage}</FormHelperText>
        )}

        {helperMessage && <FormHelperText>{helperMessage}</FormHelperText>}
      </FormControl>
    );
  }
);

Input.displayName = 'Input';

export const InputPassword: React.FC<InputProps> = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow((state) => !state);

  return (
    <Input
      {...props}
      type={show ? 'text' : 'password'}
      rightElement={
        show ? (
          <Icon
            as={PasswordHideIcon}
            color="blackAlpha.700"
            size="18"
            cursor="pointer"
            onClick={() => handleClick()}
          />
        ) : (
          <Icon
            as={PasswordShowIcon}
            color="blackAlpha.700"
            size="18"
            cursor="pointer"
            onClick={() => handleClick()}
          />
        )
      }
    />
  );
};

export const InputEmail: React.FC<InputProps> = (props) => {
  return (
    <Input
      {...props}
      type={'email'}
      rightElement={<Icon as={EmailIcon} color="blackAlpha.700" size="18" />}
    />
  );
};

export interface InputPhoneOnChangeData {
  phone?: string;
  phoneObj?: {
    areaCode?: string;
    countryAreaCode?: string;
    number?: string;
  };
}

export type InputPhoneProps = {
  readonly onChange: (data: InputPhoneOnChangeData) => void;
} & InputProps;

export const InputPhone: React.FC<InputPhoneProps> = ({
  onChange,
  label,
  required = true,
  leftElement,
  rightElement,
  helperMessage,
  errorMessage,
  borderColor,
  ...props
}) => {
  const phoneNumberId = 'phone-number' + (props?.id || '') + Math.random();
  const valueRef = useRef<InputPhoneOnChangeData>({
    phone: '',
    phoneObj: { countryAreaCode: '55', areaCode: '', number: '' }
  });

  const handleCountryAreaCodeChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const currentValue = valueRef.current;
    const countryAreaCode = event.target.value;

    const phone = `${countryAreaCode || ''}${
      currentValue?.phoneObj?.areaCode || ''
    }${currentValue?.phoneObj?.number || ''}`;

    const data: InputPhoneOnChangeData = {
      ...(valueRef.current || {}),
      phone,
      phoneObj: {
        ...(valueRef.current?.phoneObj || {}),
        countryAreaCode
      }
    };
    valueRef.current = data;
    if (onChange) {
      onChange(data);
    }
  };
  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = valueRef.current;
    let number = event.target.value;

    const cleanPhone = clearPhone(number);

    const phone = `${currentValue?.phoneObj?.countryAreaCode || ''}${
      currentValue?.phoneObj?.areaCode || ''
    }${cleanPhone || ''}`;

    const areaCode = cleanPhone?.slice(0, 2);

    number = formatPhone(cleanPhone);

    const data: InputPhoneOnChangeData = {
      ...(valueRef.current || {}),
      phone,
      phoneObj: {
        ...(valueRef.current?.phoneObj || {}),
        areaCode,
        number
      }
    };
    valueRef.current = data;

    if (onChange) {
      onChange({
        ...data,
        phoneObj: {
          ...(data.phoneObj || {}),
          number: cleanPhone.slice(2, cleanPhone?.length)
        }
      });
    }
  };

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

      <Stack direction="row" spacing={5} alignItems="flex-start">
        <Select
          width="120px"
          minHeight="50px"
          name="phoneCountryAreaCode"
          onChange={handleCountryAreaCodeChange}
          borderColor={borderColor}
        >
          <option value="55">+55</option>
        </Select>
        <Input
          id={phoneNumberId}
          name="phoneNumber"
          placeholder="999999999"
          onChange={handleNumberChange}
          borderColor={borderColor}
          value={valueRef?.current?.phoneObj?.number || ''}
        />
      </Stack>

      {errorMessage && (
        <FormHelperText color="red.500">{errorMessage}</FormHelperText>
      )}

      {helperMessage && <FormHelperText>{helperMessage}</FormHelperText>}
    </FormControl>
  );
};
