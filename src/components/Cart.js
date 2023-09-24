import CartContent from "./CartContent";

function Cart( { userEndpoint, cartEndpoint } ) {
    // get the data at the cart endpoint, parse to object, then retrieve product info
    const productsInCart = JSON.parse( localStorage.getItem(cartEndpoint) ).products;

    return (
        <div id="cart-container">
            <h2>Cart</h2>
            { productsInCart.map( product => <CartContent key={product.productId} product={product} /> ) }
        </div>
    );
}

export default Cart;
