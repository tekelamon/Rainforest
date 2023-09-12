import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Product( {id} ) {
    const [product, setProduct] = useState({});

    // get product from api
    useEffect(()=>{
        const getProduct = async () => {
            try {
                fetch(`https://fakestoreapi.com/products/${id}`)
                    .then( res => res.json() )
                    .then( json => setProduct( json ) )
            } catch (err) {
                console.error( err );
            }
        }
        getProduct();
    },[]);

    // transform data to card element
    return (
        <div className="product">
            <h2 className="product-title">{product.title}</h2>
            <img className="product-image" src={product.image} />
            <p className="product-price">{product.price}</p>
            <Link to={`/product/${product.id}`} >View Details</Link>
        </div>
    );
    // TODO create api services panel to contain all api requests (stay DRY for api endpoint)
}

export default Product;
