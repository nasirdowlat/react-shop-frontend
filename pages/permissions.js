/* eslint-disable no-unused-vars */
import PleaseSignin from '../components/PleaseSignin';
import UserPermissions from '../components/UserPermissions';

const Permissions = props => (
  <div>
    <PleaseSignin>
      <UserPermissions />
    </PleaseSignin>
  </div>
);

export default Permissions;
