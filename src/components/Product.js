import { useNavigate } from "react-router-dom";
import { addtoCart } from "./helperFunctions";
import ReactModal from "react-modal";
import { useState } from "react";

function Product( { product:{id, title, image, price}, cartEndpoint, currentCart, setCurrentCart } ) {
    const [showAdded, setShowAdded] = useState(false);
    const popUp = async () => {
        setShowAdded(true);
        setTimeout(()=>{setShowAdded(false)}, 850);
    };
    
    const navigate = useNavigate();

    // transform data to card element
    return (
        <div className="product">
            <h2 className="product-title">{title}</h2>
            <img className="product-image" src={image} alt="" />
            <p className="product-price">${price.toFixed(2)}</p>
            <button onClick={()=>navigate(`/product/${id}`)}>View Details</button>
            <button onClick={()=>{addtoCart( id, cartEndpoint, currentCart, setCurrentCart );popUp()}}>Add to cart</button>
            <ReactModal
                isOpen={showAdded}
                ariaHideApp={false}
                style={{ content: {
                    top: '20%',
                    left: '15%',
                    right: '15%',
                    bottom: '20%'
                }}}
            >
                <div id="addToCartUpdate">
                    <p>{title} was added to cart</p>
                </div>
            </ReactModal>
        </div>
    );
}

export default Product;
