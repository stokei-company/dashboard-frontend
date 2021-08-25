import { Flex, Link } from '@chakra-ui/react';
import Router from 'next/router';
import NextLink from 'next/link';
import { memo } from 'react';
import { ButtonOutlined } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { AppModel } from '~/services/@types/app';
import { AppAvatar } from '~/components/ui/app-avatar';

interface Props {
  readonly app: AppModel;
}

export const App: React.FC<Props> = memo(({ app }) => {
  const url = `/apps/${app.id}`;
  return (
    <NextLink href={url}>
      <Link _hover={{ textDecoration: 'none' }}>
        <Card
          title={app?.name}
          subtitle={app?.nickname && '@' + app?.nickname}
          avatar={<AppAvatar name={app?.name} src={app?.logo} size="md" />}
          _hover={{
            boxShadow: 'md'
          }}
          footer={
            <Flex>
              <ButtonOutlined onClick={() => Router.push(url)}>
                Acessar
              </ButtonOutlined>
            </Flex>
          }
        />
      </Link>
    </NextLink>
  );
});
App.displayName = 'App';
export default App;
