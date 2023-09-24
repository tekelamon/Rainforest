import { useState, useEffect } from "react";
import { getProductById } from "./api-services";

function CartContent( {product} ) {
    const [productInfo, setProductInfo] = useState({});

    useEffect(()=>{
        const getProductInfo = async () => {
            const response = await getProductById( product.productId );
            setProductInfo( response );
        };
        getProductInfo();
    },[]);

    return (
        <div className="cart-content">
            <img src={productInfo.image} alt={productInfo.description} />
            <p>{ productInfo.title }</p>
            <p>{ productInfo.price }</p>
            <p>{ product.quantity }</p>
            <p>Total: { productInfo.price * product.quantity }</p>
        </div>
    );
}

export default CartContent;
