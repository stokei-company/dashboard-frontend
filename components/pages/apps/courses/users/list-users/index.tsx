import { SimpleGrid } from "@chakra-ui/react";
import { SubscriptionModel } from "~/services/@types/subscription";
import { User } from "../user";

interface Props {
  readonly users: SubscriptionModel[];
}

export const ListUsers: React.FC<Props> = ({ users }) => {
  return (
    <SimpleGrid width="full" spacing="10" columns={[1, 2, 2, 3]}>
      {users?.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </SimpleGrid>
  );
};

export default ListUsers;
