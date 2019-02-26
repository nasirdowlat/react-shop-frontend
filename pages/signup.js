import styled from 'styled-components';
import SignupForm from '../components/SignupForm';
import SigninForm from '../components/SigninForm';
import RequestResetForm from '../components/RequestResetForm';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20;
`;
const Signup = props => (
  <Columns>
    <SignupForm />
    <SigninForm />
    <RequestResetForm />
  </Columns>
);
export default Signup;
