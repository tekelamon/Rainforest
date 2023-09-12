import { useState, useEffect } from "react";
import Product from "./Product";
import { getAllProducts } from "./api-services";

// display all products returned from api in card elements
function Products() {
    const [products, setProducts] = useState([]);

    // get products from api
    useEffect(()=>{
        const getData = async () => {
            const response = await getAllProducts();
            setProducts( response );
        }
        getData();
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
