/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';

const CartStylesItem = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0px;
  }
`;

const CartItem = ({ cartItem }) => (
  <CartStylesItem>
    <img src={cartItem.item.image} width="100" alt={cartItem.item.title} />
    <div className="cart-item-details">
      <h3>{cartItem.item.title}</h3>
      <p>
        {formatMoney(cartItem.item.price * cartItem.quantity)}
        {' - '}
        <em>
          {cartItem.quantity} &times; {formatMoney(cartItem.item.price)} each
        </em>
      </p>
    </div>
  </CartStylesItem>
);
export default CartItem;