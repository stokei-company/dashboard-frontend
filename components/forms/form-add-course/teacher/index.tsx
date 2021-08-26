import { Badge, Link, Spacer, Stack, Text } from '@chakra-ui/react';
import { UserAvatar } from '~/components/ui/user-avatar';

export interface TeacherData {
  readonly id: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly fullname: string;
  readonly avatar?: string;
}

export interface TeacherProps {
  readonly teacher: TeacherData;
  readonly itsMe?: boolean;
  readonly onRemove: () => void;
}

export const Teacher: React.FC<TeacherProps> = ({
  teacher,
  itsMe = false,
  onRemove,
  ...props
}) => {
  return (
    <Stack width="full" direction="row" spacing={3} align="center">
      <UserAvatar size="sm" src={teacher.avatar} name={teacher.fullname} />
      <Text lineHeight="shorter" fontWeight="bold">
        {teacher.fullname}{' '}
        {itsMe && (
          <Badge paddingY={1} paddingX={2} colorScheme="blue">
            Eu
          </Badge>
        )}
      </Text>
      <Spacer />
      <Link
        color="red.500"
        _hover={{ color: 'red.500' }}
        _focus={{ color: 'red.500' }}
        onClick={() => onRemove && onRemove()}
      >
        Remover
      </Link>
    </Stack>
  );
};
