import {
  ContainerProps,
  Container as ContainerDefault,
} from "@chakra-ui/react";

interface Props extends ContainerProps {}

export const Container: React.FC<Props> = ({ children, ...props }) => {
  return (
    <ContainerDefault
      marginTop={0}
      paddingY={0}
      paddingX={5}
      maxW="container.lg"
      {...props}
    >
      {children}
    </ContainerDefault>
  );
};
