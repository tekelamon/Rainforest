import { Link, Outlet } from "react-router-dom";

function Navigation() {
    return ( <>
        <nav>
            <Link to='/' >Browse Products</Link>
            <Link to='./cart' >View Cart</Link>

            <Link to='./login' >Login</Link>
            <Link to='./signup' >Signup</Link>
        </nav>

        <Outlet />
    </>);
}

export default Navigation;
