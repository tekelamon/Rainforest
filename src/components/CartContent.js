import { useState, useEffect } from "react";
import { getProductById } from "./api-services";
import ReactModal from "react-modal";

function CartContent( {product, cartEndpoint, setCurrentCart} ) {
    const [productInfo, setProductInfo] = useState({});
    const [quantity, setQuantity] = useState( product.quantity );

    const [confirmDelete, setConfirmDelete] = useState(false);

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
        if( operation === "-" ) {
            items[index].quantity--;
            // do not allow quantity to become less than 1, remove from cart instead
            if( items[index].quantity < 1 ) {
                items[index].quantity++;
                // ask if user wants to remove from cart
                setConfirmDelete(true);
            }
        }

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
                <button onClick={()=>setConfirmDelete(true)}>Delete</button>
                <button onClick={()=>updateQuantity("-")}>-</button>
                <p>{ quantity }</p>
                <button onClick={()=>updateQuantity("+")}>+</button>
            </div>
            <p>Total: { productInfo.price * quantity }</p>
            <ReactModal
                isOpen={confirmDelete}
                ariaHideApp={false}
            >
                <div id="confirmDelete">
                    <p>Do you want to remove "{productInfo.title}" from your cart?</p>
                    <button onClick={()=>setConfirmDelete(false)}>No</button>
                    <button onClick={()=>removeFromCart()}>Yes</button>
                </div>
            </ReactModal>
        </div>
    );
}

export default CartContent;
