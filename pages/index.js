import Items from '../components/Items';

// eslint-disable-next-line react/prop-types
const Home = ({ query }) => (
  <div>
    <p>Home!</p>
    <Items page={parseFloat(query.page) || 1} />
  </div>
);

export default Home;
