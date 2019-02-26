/* eslint-disable no-unused-vars */
import ResetForm from '../components/ResetForm';

// eslint-disable-next-line react/prop-types
const Reset = ({ query: { resetToken } }) => (
  <div>
    <ResetForm resetToken={resetToken} />
  </div>
);

export default Reset;
