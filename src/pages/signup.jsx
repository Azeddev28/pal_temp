import { withAuthorization } from '@/auth';
import { SignUp } from '@/views/SignUp';

const Page = () => {
    return <SignUp />;
};

export default withAuthorization(Page);
