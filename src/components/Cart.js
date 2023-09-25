import CartContent from "./CartContent";

function Cart( { userEndpoint, cartEndpoint, currentCart, setCurrentCart } ) {
    return (
        <div id="cart-container">
            <h2>Cart</h2>
            {
                currentCart.map( product =>
                    <CartContent
                        key={product.productId}
                        product={product}
                        cartEndpoint={cartEndpoint}
                        setCurrentCart={setCurrentCart}
                    />
                )
            }
        </div>
    );
}

export default Cart;
