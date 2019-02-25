import SingleItem from '../components/SingleItem';

// eslint-disable-next-line react/prop-types
const Item = ({ query }) => (
  <div>
    <SingleItem id={query.id} />
  </div>
);

export default Item;
