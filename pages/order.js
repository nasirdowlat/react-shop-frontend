/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PleaseSignin from '../components/PleaseSignin';
import OrderDetails from '../components/OrderDetails';

const Order = props => (
  <div>
    <PleaseSignin>
      <OrderDetails id={props.query.id} />
    </PleaseSignin>
  </div>
);

export default Order;
