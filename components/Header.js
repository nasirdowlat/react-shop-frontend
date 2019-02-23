import Nav from './Nav';

const Header = () => (
    <div>
        <div className="bar">
            <a href="">React Shop</a>
            <Nav />
        </div>
        <div className="sub-bar">
            <p>Search</p>
        </div>
        <div>cart</div>
    </div>
)

export default Header;