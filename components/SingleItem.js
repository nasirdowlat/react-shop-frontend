import React, { Component } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import Error from './ErrorMessage';

const SingleItemStyles = styled.div`
    max-width: 1200px;
    margin: 2red auto;
    box-shadow: ${props => props.theme.bs}
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 800px;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .details {
        margin: 3rem;
        font-size: 2rem;
    }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      image
    }
  }
`;
class SingleItem extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { id } = this.props;
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id,
        }}
      >
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No item found for {id}</p>;
          const { item } = data;
          return (
            <SingleItemStyles>
              <Head>
                <title>Reactshop | {item.title}</title>
              </Head>
              <img src={item.image} alt={item.title} />
              <div className="details">
                <h2>Viewing: {item.title}</h2>
                <p>{item.description}</p>
              </div>
            </SingleItemStyles>
          );
        }}
      </Query>
    );
  }
}

export default SingleItem;