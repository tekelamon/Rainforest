import { useState } from "react";
import CartContent from "./CartContent";

function Cart( { userEndpoint, cartEndpoint } ) {
    // get the data at the cart endpoint, parse to object, then retrieve product info
    const productsInCart = JSON.parse( localStorage.getItem(cartEndpoint) ).products;

    const [currentCart, setCurrentCart] = useState(productsInCart);

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
