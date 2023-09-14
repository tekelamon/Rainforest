import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getProductById } from "./api-services";

function Product( {id} ) {
    const [product, setProduct] = useState({});

    // get product from api
    useEffect(()=>{
        const getData = async () => {
            const response = await getProductById(id);
            setProduct( response );
        }
        getData();
    });

    // transform data to card element
    return (
        <div className="product">
            <h2 className="product-title">{product.title}</h2>
            <img className="product-image" src={product.image} alt="" />
            <p className="product-price">{product.price}</p>
            <Link to={`/product/${id}`} >View Details</Link>
        </div>
    );
}

export default Product;
