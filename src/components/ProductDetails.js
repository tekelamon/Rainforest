/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "./api-services";
import { useState, useEffect } from "react";
import { addtoCart } from "./helperFunctions";

const ProductDetails = ( { cartEndpoint, currentCart, setCurrentCart } ) => {
    const [product, setProduct] = useState({});

    // get id of the individual product from the link passed in
    const passedProduct = useParams();

    const navigate = useNavigate();

    // get data for product to display
    useEffect(()=>{
        const getData = async () => {
            const response = await getProductById(passedProduct.id);
            setProduct( response );
        };
        getData();
    },[]);

    return <div className="product-details">
        <img src={product.image} className="product-details-image" alt="" />
        <h2 className="product-details-title">{product.title}</h2>
        <p className="product-details-price">${product.price}</p>
        <p className="product-details-description" >{product.description}</p>
        <button onClick={()=>{addtoCart( product.id, cartEndpoint, currentCart, setCurrentCart )}}>Add to cart</button>
        <button onClick={()=>navigate("/")} >Go Home</button>
    </div>
}

export default ProductDetails;
