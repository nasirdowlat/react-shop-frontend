import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class RequestResetForm extends Component {
  state = {
    email: '',
  };

  _saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email } = this.state;
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { loading, error, called }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await reset();
              this.setState({ email: '' });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Request a password reset</h2>
              {error && <Error error={error} />}
              {!error && !loading && called && (
                <p>Check your email for a request email</p>
              )}

              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={this._saveToState}
                  required
                />
              </label>
              <button type="submit">Request Reset!</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default RequestResetForm;
