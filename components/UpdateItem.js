import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';

import Error from './ErrorMessage';
import Form from './styles/Form';

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  handleUpdateItem = async (e, updateItem) => {
    e.preventDefault();
    console.log('Updating item...');
    // eslint-disable-next-line react/prop-types
    const { id } = this.props;
    const res = await updateItem({
      variables: {
        id,
        ...this.state,
      },
    });
    console.log('Updated!!');
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { id } = this.props;
    const { description, price, title } = this.state;
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id,
        }}
      >
        {({ data, loadingQuery }) => {
          if (loadingQuery) return <p>Loading...</p>;
          if (!data.item) return <p>No item found for id</p>;
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loadingMutation, error }) => (
                <Form
                  onSubmit={async e => this.handleUpdateItem(e, updateItem)}
                >
                  <Error error={error} />
                  <fieldset
                    disabled={loadingMutation}
                    aria-busy={loadingMutation}
                  >
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        onChange={this.handleChange}
                        defaultValue={data.item.title}
                        value={title}
                        required
                      />
                    </label>

                    <label htmlFor="price">
                      Price
                      <input
                        type="text"
                        id="price"
                        name="price"
                        placeholder="Price"
                        onChange={this.handleChange}
                        defaultValue={data.item.price}
                        value={price}
                        required
                      />
                    </label>

                    <label htmlFor="Description">
                      Description
                      <textarea
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Description"
                        onChange={this.handleChange}
                        defaultValue={data.item.description}
                        value={description}
                        required
                      />
                    </label>
                    <button type="submit">
                      Sav{loadingMutation ? 'ing' : 'e'}
                    </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION, SINGLE_ITEM_QUERY };
