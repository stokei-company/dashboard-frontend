import { Flex, Spacer, Stack } from '@chakra-ui/react';
import { useContext } from 'react';
import { Container } from '~/components/layouts/container';
import { Image } from '~/components/ui/image';
import { AuthContext } from '~/contexts/auth';
import { logoUrl } from '~/utils/constants';
import { AppBox } from './app-box';
import { OptionBox } from './option-box';
import { UserBox } from './user-box';

interface Props {}

export const Navbar: React.FC<Props> = ({ ...props }) => {
  const { authenticated } = useContext(AuthContext);
  return (
    <Container as="nav" width="full">
      <Flex alignItems="center" paddingY={3}>
        <Spacer />
        <AppBox />
        <Spacer />
        {authenticated && (
          <Stack direction="row" spacing={4} align="center">
            <OptionBox />
            <UserBox />
          </Stack>
        )}
      </Flex>
    </Container>
  );
};
