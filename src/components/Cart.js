import { useState } from "react";
import CartContent from "./CartContent";

function Cart( { userEndpoint, cartEndpoint, currentCart, setCurrentCart } ) {
    // create an array with space for each product in cart
    const [subtotals, setSubtotals] = useState( Array(currentCart.length).fill(0) );
    const [displayTotal, setDisplayTotal] = useState(0);

    const updateDisplay = () => {
        setDisplayTotal( subtotals.reduce((a,b)=>a+b) );
    };

    return (
        <div id="cart-container">
            <h2>Cart</h2>
            {
                currentCart.map( (product, index) =>
                    <CartContent
                        key={index}
                        indexInSubtotals={index}
                        product={product}
                        cartEndpoint={cartEndpoint}
                        setCurrentCart={setCurrentCart}
                        subtotals={subtotals}
                        setSubtotals={setSubtotals}
                        updateDisplay={updateDisplay}
                    />
                )
            }
            <div>
                Total: { displayTotal }
            </div>
        </div>
    );
}

export default Cart;
