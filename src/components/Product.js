import { Link } from "react-router-dom";

function Product( {product:{id, title, image, price}} ) {
    // transform data to card element
    return (
        <div className="product">
            <h2 className="product-title">{title}</h2>
            <img className="product-image" src={image} alt="" />
            <p className="product-price">{price}</p>
            <Link to={`/product/${id}`} >View Details</Link>
        </div>
    );
}

export default Product;
