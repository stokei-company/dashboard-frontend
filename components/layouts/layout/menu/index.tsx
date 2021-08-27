import {
  Flex,
  FlexProps,
  Icon,
  Link as ChakraLink,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useContext } from 'react';
import { ReactNode } from 'react-markdown';
import { ArrowDownIcon, ArrowUpIcon } from '~/components/icons';
import { Image } from '~/components/ui/image';
import { MenuContext, MenuSubitemData } from '~/contexts/menu';
import { colors } from '~/styles/colors';
import { logoUrl } from '~/utils/constants';
import { Link } from './link';

interface MenuProps extends FlexProps {}

export const Menu: React.FC<MenuProps> = ({ children, ...props }) => {
  const { options } = useContext(MenuContext);
  if (!options || !options.length) {
    return <></>;
  }
  return (
    <Flex width="full" flexDirection="column" backgroundColor="white">
      <Flex width="full" paddingX={5} paddingY={3}>
        <NextLink href="/">
          <ChakraLink>
            <Image
              src={logoUrl}
              height="35px"
              fallbackSrc="/logo.png"
              alt="logo"
            />
          </ChakraLink>
        </NextLink>
      </Flex>
      <Stack
        width="full"
        paddingY={10}
        spacing={1}
        direction="column"
        overflowY="auto"
      >
        {options.map((item, key) =>
          item.subitems?.length > 0 ? (
            <Submenu
              key={key}
              title={item.title}
              icon={item.icon}
              options={item.subitems}
            />
          ) : (
            <Link key={key} href={item.href} icon={item.icon}>
              {item.title}
            </Link>
          )
        )}
      </Stack>
    </Flex>
  );
};

interface SubmenuProps {
  readonly title: string;
  readonly icon?: ReactNode;
  readonly options: MenuSubitemData[];
}

export const Submenu: React.FC<SubmenuProps> = ({
  title,
  icon,
  options,
  ...props
}) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Flex width="full" flexDirection="column">
      <Flex
        width="full"
        paddingY={3}
        paddingX={5}
        cursor="pointer"
        justifyContent="space-between"
        alignItems="center"
        color="gray.500"
        onClick={() => onToggle()}
      >
        <Stack flex={1} spacing={5} direction="row" alignItems="center">
          {icon && <Flex fontSize="lg">{icon}</Flex>}
          <Text lineHeight="shorter" fontSize="md">
            {title}
          </Text>
        </Stack>
        <Icon as={!isOpen ? ArrowDownIcon : ArrowUpIcon} />
      </Flex>
      {isOpen && (
        <Stack
          width="full"
          spacing={1}
          paddingY={1}
          direction="column"
          overflowY="auto"
          backgroundColor="gray.50"
        >
          {options.map((item, key) => (
            <Link key={key} href={item.href} paddingLeft={8}>
              <Text lineHeight="shorter" fontSize="sm">
                {item.title}
              </Text>
            </Link>
          ))}
        </Stack>
      )}
    </Flex>
  );
};
