/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { getProductById } from "./api-services";
import ReactModal from "react-modal";

function CartContent( { indexInSubtotals, product, cartEndpoint, setCurrentCart, subtotals, setSubtotals, updateDisplay } ) {
    const [productInfo, setProductInfo] = useState({});
    const [quantity, setQuantity] = useState( product.quantity );

    const [confirmDelete, setConfirmDelete] = useState(false);

    const [fail, setFail] = useState(false);

    // get all cart data
    let cart = JSON.parse( localStorage.getItem(cartEndpoint) );

    // get list of items in cart
    let items = cart.products;

    // find this item
    const index = items.findIndex( item => item.productId === product.productId );

    useEffect(()=>{
        const getProductInfo = async () => {
            // get product info from api
            const response = await getProductById( product.productId );
            // if api request fails, update fail state and stop execution of function
            if( !response ) { setFail(true); return; }
            // update product info
            setProductInfo( response );
            // update total for cart component now that price is found
            let newTotals = subtotals;
            newTotals[indexInSubtotals] = product.quantity * response.price;
            setSubtotals( newTotals );
            updateDisplay();
        };
        getProductInfo();
    },[]);

    const updateQuantity = ( operation ) => {
        // update quantities
        if( operation === "+" ) { items[index].quantity++; }
        if( operation === "-" ) {
            items[index].quantity--;
            // do not allow quantity to become less than 1, remove from cart instead
            if( items[index].quantity < 1 ) {
                items[index].quantity++;
                // ask if user wants to remove from cart
                setConfirmDelete(true);
            }
        }

        // used to render in this component
        setQuantity( items[index].quantity );

        // update subtotal in cart component
        let newTotals = subtotals;
        newTotals[indexInSubtotals] = items[index].quantity * productInfo.price;
        setSubtotals( newTotals );
        updateDisplay();

        // update carts
        cart.products = items;
        localStorage.setItem( cartEndpoint, JSON.stringify( cart ) );
        setCurrentCart( cart.products );
    };

    const removeFromCart = () => {
        // splice to remove
        items.splice(index,1);

        // update carts
        cart.products = items;
        localStorage.setItem( cartEndpoint, JSON.stringify( cart ) );
        setCurrentCart( cart.products );
        setConfirmDelete( false );
        window.location.reload(false);
    };

    return (!fail) ? (
        <div className="cart-content">
            <img src={productInfo.image} alt={productInfo.description} />
            <p>{ productInfo.title }</p>
            <p>${ productInfo.price }</p>
            <div className="product-quantity">
                <button onClick={()=>setConfirmDelete(true)}>Delete</button>
                <button onClick={()=>updateQuantity("-")}>-</button>
                <p>{ quantity }</p>
                <button onClick={()=>updateQuantity("+")}>+</button>
            </div>
            <p>Total: ${ (productInfo.price * quantity).toFixed(2) }</p>
            <ReactModal
                isOpen={confirmDelete}
                ariaHideApp={false}
                style={{ content: {
                    top: '20%',
                    left: '15%',
                    right: '15%',
                    bottom: '20%'
                }}}
            >
                <div id="confirmDelete">
                    <p>Do you want to remove "{productInfo.title}" from your cart?</p>
                    <button onClick={()=>setConfirmDelete(false)}>No</button>
                    <button onClick={()=>removeFromCart()}>Yes</button>
                </div>
            </ReactModal>
        </div>
    ) : (
        <div className="cart-content">
            <p>Trouble getting this product's info</p>
        </div>
    );
}

export default CartContent;
