import { Link } from "react-router-dom";
import { addtoCart } from "./helperFunctions";
import ReactModal from "react-modal";
import { useState } from "react";

function Product( { product:{id, title, image, price}, cartEndpoint, currentCart, setCurrentCart } ) {
    const [showAdded, setShowAdded] = useState(false);
    const popUp = async () => {
        setShowAdded(true);
        setTimeout(()=>{setShowAdded(false)}, 850);
    };

    // transform data to card element
    return (
        <div className="product">
            <h2 className="product-title">{title}</h2>
            <img className="product-image" src={image} alt="" />
            <p className="product-price">{price}</p>
            <Link to={`/product/${id}`} >View Details</Link>
            <button onClick={()=>{addtoCart( id, cartEndpoint, currentCart, setCurrentCart );popUp()}}>Add to cart</button>
            <ReactModal
                isOpen={showAdded}
                ariaHideApp={false}
            >
                <div id="addToCartUpdate">
                    <p>{title} was added to cart</p>
                </div>
            </ReactModal>
        </div>
    );
}

export default Product;
