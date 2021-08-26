import { Flex, FormLabel, Stack, Text } from '@chakra-ui/react';
import React, {
  ChangeEvent,
  ReactNode,
  useCallback,
  useRef,
  useState
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Input, InputProps } from '../input';

interface Props extends InputProps {
  readonly onSearch: (text: string) => Promise<any[]>;
  readonly onItemClick: (data: any) => void;
  readonly item: (data: any, index?: number, array?: any) => ReactNode;
  readonly noItems: ReactNode;
  readonly hideCurrentItem?: boolean;
}

export const InputSearch: React.FC<Props> = ({
  item,
  noItems,
  hideCurrentItem = false,
  onSearch,
  onItemClick,
  ...props
}) => {
  const [currentItem, setCurrentItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any[]>(null);
  const inputRef = useRef();
  const debounced = useDebouncedCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const value = e?.target?.value;
      const response = await onSearch(value);
      setItems(response && response.length > 0 ? response : []);
      setOpen(true);
    },
    500
  );

  const handleChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      debounced(e);
    },
    [debounced]
  );

  const handleClickItem = useCallback(
    (item: any) => {
      if (onItemClick) {
        onItemClick(item);
      }
      setCurrentItem(item);
      setOpen(false);

      if (inputRef.current) {
        (inputRef.current as any).value = '';
      }
    },
    [onItemClick]
  );

  return (
    <Flex direction="column" position="relative">
      {!hideCurrentItem && currentItem ? (
        <Flex width="full" flexDir="column" marginBottom={2}>
          {props?.label && <FormLabel margin={0}>{props?.label}</FormLabel>}
          <Stack width="full" direction="column">
            {item(currentItem)}
          </Stack>
          <Flex>
            <Text
              color="red.500"
              cursor="pointer"
              fontSize="sm"
              onClick={() => setCurrentItem(null)}
            >
              Escolher outro
            </Text>
          </Flex>
        </Flex>
      ) : (
        <Input
          {...props}
          ref={inputRef}
          size="md"
          autoComplete="off"
          backgroundColor="white"
          _hover={{
            borderColor: 'green.600'
          }}
          focusBorderColor="green.600"
          borderRadius="sm"
          onChange={handleChange}
        />
      )}

      <Flex width="full" position="relative">
        {open && (
          <Stack
            width="full"
            maxHeight="200px"
            position="absolute"
            overflowX="hidden"
            overflowY="auto"
            zIndex="dropdown"
            direction="column"
            backgroundColor="white"
            borderRadius="sm"
            boxShadow="md"
            right="0"
            top="0"
            spacing={0}
            onMouseLeave={() => setOpen(false)}
          >
            {items && items.length > 0 ? (
              items.map((data, index, array) => (
                <Flex
                  width="full"
                  key={(data?.id || data?.key || index) + ''}
                  cursor="pointer"
                  _hover={{
                    opacity: 0.7
                  }}
                  paddingX={3}
                  onClick={() => handleClickItem(data)}
                >
                  {item(data, index, array)}
                </Flex>
              ))
            ) : (
              <Flex width="full" paddingY={2} paddingX={3}>
                {noItems}
              </Flex>
            )}
          </Stack>
        )}
      </Flex>
    </Flex>
  );
};
