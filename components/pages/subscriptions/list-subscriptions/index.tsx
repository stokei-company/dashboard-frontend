import { Flex, SimpleGrid } from '@chakra-ui/react';
import { SubscriptionModel } from '~/services/@types/subscription';
import { NoSubscription } from '../no-subscription';
import { Subscription } from '../subscription';

interface Props {
  readonly subscriptions: SubscriptionModel[];
}

export const ListSubscriptions: React.FC<Props> = ({ subscriptions }) => {
  return (
    <Flex width="full">
      {subscriptions?.length > 0 ? (
        <SimpleGrid width="full" spacing="10" columns={[1, 1, 2, 3]}>
          {subscriptions?.map((subscription) => (
            <Subscription key={subscription.id} subscription={subscription} />
          ))}
        </SimpleGrid>
      ) : (
        <NoSubscription />
      )}
    </Flex>
  );
};

export default ListSubscriptions;
