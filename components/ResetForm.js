import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

class RequestResetForm extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  };

  state = {
    password: '',
    confirmPassword: '',
  };

  _saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { resetToken } = this.props;
    const { password, confirmPassword } = this.state;

    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken,
          password,
          confirmPassword,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(resetPassword, { loading, error }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await resetPassword();
              this.setState({ password: '', confirmPassword: '' });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset your password</h2>
              {error && <Error error={error} />}
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={this._saveToState}
                  required
                />
              </label>
              <label htmlFor="confirm password">
                Password
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={this._saveToState}
                  required
                />
              </label>
              <button type="submit">Reset Password !</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default RequestResetForm;
