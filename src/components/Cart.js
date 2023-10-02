import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CartContent from "./CartContent";

function Cart( { cartEndpoint, currentCart, setCurrentCart } ) {
    // create an array with space for each product in cart
    const [subtotals, setSubtotals] = useState( Array(currentCart.length).fill(0) );
    const [displayTotal, setDisplayTotal] = useState(0);

    const [fail, setFail] = useState(false);

    const updateDisplay = () => {
        try {
            setDisplayTotal( subtotals.reduce((a,b)=>a+b) );
        } catch {
            setFail(true);
            setDisplayTotal(0);
            return;
        }
    };

    const navigate = useNavigate();
    const completeCheckout = () => {
        navigate("../checkout-complete");
    };

    return (!fail) ? (
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
                <button onClick={()=>completeCheckout()}>Checkout</button>
            </div>
        </div>
    ) : (
        <div id="cart-container">
            <p>Issues generating cart</p>
        </div>
    );
}

export default Cart;
