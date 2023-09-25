import { useState, useEffect } from "react";
import { getProductById } from "./api-services";

function CartContent( {product, cartEndpoint, setCurrentCart} ) {
    const [productInfo, setProductInfo] = useState({});
    const [quantity, setQuantity] = useState( product.quantity );

    // get all cart data
    let cart = JSON.parse( localStorage.getItem(cartEndpoint) );

    // get list of items in cart
    let items = cart.products;

    // find this item
    const index = items.findIndex( item => item.productId === product.productId );

    useEffect(()=>{
        const getProductInfo = async () => {
            const response = await getProductById( product.productId );
            setProductInfo( response );
        };
        getProductInfo();
    },[]);

    const updateQuantity = ( operation ) => {
        // update quantities
        if( operation === "+" ) { items[index].quantity++; }
        if( operation === "-" ) { items[index].quantity--; }

        setQuantity( items[index].quantity );

        // update carts
        cart.products = items;
        localStorage.setItem( cartEndpoint, JSON.stringify( cart ) );
    };

    const removeFromCart = () => {
        // splice to remove
        items.splice(index,1);

        // update carts
        cart.products = items;
        localStorage.setItem( cartEndpoint, JSON.stringify( cart ) );
        setCurrentCart( cart.products );
    };

    return (
        <div className="cart-content">
            <img src={productInfo.image} alt={productInfo.description} />
            <p>{ productInfo.title }</p>
            <p>{ productInfo.price }</p>
            <div className="productQuantity">
                <button onClick={()=>removeFromCart()}>Delete</button>
                <button onClick={()=>updateQuantity("-")}>-</button>
                <p>{ quantity }</p>
                <button onClick={()=>updateQuantity("+")}>+</button>
            </div>
            <p>Total: { productInfo.price * quantity }</p>
        </div>
    );
}

export default CartContent;
