/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PleaseSignin from '../components/PleaseSignin';
import OrdersList from '../components/OrdersList';

const Orders = props => (
  <div>
    <PleaseSignin>
      <OrdersList />
    </PleaseSignin>
  </div>
);

export default Orders;
