import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';
import calcTotalPrice from '../lib/calcTotalPrice';
import { stripeKey } from '../config';

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class TakeMyMoney extends React.Component {
  onToken = res => {
    const tokenId = res.id;
  };

  render() {
    return (
      <User>
        {({ data: { me } }) => {
          if (me.cart === null || me.cart.length === 0) {
            return null;
          }
          return (
            <StripeCheckout
              amount={calcTotalPrice(me.cart)}
              name="React Shop"
              description={`Order of ${totalItems(me.cart)}`}
              image={me.cart[0].item && me.cart[0].item.image}
              stripeKey={stripeKey}
              currency="CAD"
              email={me.email}
              token={res => this.onToken(res)}
            >
              {this.props.children}
            </StripeCheckout>
          );
        }}
      </User>
    );
  }
}

export default TakeMyMoney;
