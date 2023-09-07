import { useState, useEffect } from "react";

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
        <div id="all-products">
            <ul>
            {
                products.map( product => {
                    return <li key={product.id}>{product.title}</li>
                })
            }
            </ul>
        </div>
    );
}

export default Products;
