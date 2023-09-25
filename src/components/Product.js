import { Link } from "react-router-dom";
import { addtoCart } from "./helperFunctions";

function Product( { product:{id, title, image, price}, cartEndpoint, currentCart, setCurrentCart } ) {
    // transform data to card element
    return (
        <div className="product">
            <h2 className="product-title">{title}</h2>
            <img className="product-image" src={image} alt="" />
            <p className="product-price">{price}</p>
            <Link to={`/product/${id}`} >View Details</Link>
            <button onClick={()=>{addtoCart( id, cartEndpoint, currentCart, setCurrentCart )}}>Add to cart</button>
        </div>
    );
}

export default Product;
