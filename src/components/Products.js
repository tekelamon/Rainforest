import { useState, useEffect } from "react";
import Product from "./Product";

// a place to display all products returned from api in card elements
function Products() {
    const [products, setProducts] = useState([]);

    // get products from api
    useEffect(()=>{
        const getAllProducts = async () => {
            fetch('https://fakestoreapi.com/products')
                .then( res => res.json() )
                .then( json => setProducts( json ) )
        };
        getAllProducts();
    },[]);

    return (
        <div id="all-products-container">
            {
                products.map( product => <Product id={product.id} key={product.id} /> )
            }
        </div>
    );
}

export default Products;
