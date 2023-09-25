import { Link, useParams } from "react-router-dom";
import { getProductById } from "./api-services";
import { useState, useEffect } from "react";
import { addtoCart } from "./helperFunctions";

const ProductDetails = ( { userAccount, cartEndpoint, currentCart, setCurrentCart } ) => {
    const [product, setProduct] = useState({});

    // get id of the individual product from the link passed in
    const passedProduct = useParams();

    // get data for product to display
    useEffect(()=>{
        const getData = async () => {
            const response = await getProductById(passedProduct.id);
            setProduct( response );
        };
        getData();
    });

    return <div>
        <img src={product.image} className="product-details-image" alt="" />
        <h2 className="product-details-title">{product.title}</h2>
        <p className="product-details-price">{product.price}</p>
        <button onClick={()=>{addtoCart( product.id, cartEndpoint, currentCart, setCurrentCart )}}>Add to cart</button>
        <Link to="/">Go Home</Link>
    </div>
}

export default ProductDetails;
