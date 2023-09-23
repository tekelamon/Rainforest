import { Link, useParams } from "react-router-dom";
import { getProductById } from "./api-services";
import { useState, useEffect } from "react";

const ProductDetails = ( { userAccount } ) => {
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
        {/* TODO make button to add to cart when cart is functional */}
        <p>Add to cart</p>
        <Link to="/">Go Home</Link>
    </div>
}

export default ProductDetails;
