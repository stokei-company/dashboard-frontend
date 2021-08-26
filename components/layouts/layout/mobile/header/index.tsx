import { Header as HeaderLayout } from '~/components/layouts/layout/header';
import { Navbar } from '../navbar';

interface Props {}

export const Header: React.FC<Props> = ({ children, ...props }) => {
  return (
    <HeaderLayout>
      <Navbar />
    </HeaderLayout>
  );
};
