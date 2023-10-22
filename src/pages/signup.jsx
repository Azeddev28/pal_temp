import { withAuthorization } from '@/auth/withAuthorization';
import { SignUp } from '@/views/SignUp';

const Page = () => {
    return <SignUp />;
};

export default withAuthorization(Page);
