import { useState, useEffect } from "react";
import Product from "./Product";
import { getAllProducts } from "./api-services";

// display all products returned from api in card elements
function Products() {
    const [allProducts, setAllProducts] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState('');

    // get products from api
    useEffect(()=>{
        const getData = async () => {
            const response = await getAllProducts();
            setAllProducts( response );
        }
        getData();
    },[]);

    // tracks which products to show
    const filterProducts = ( products ) => {
        // holds all positive matches
        const foundProducts = [];

        // filter using the state tracked from our input
        products.forEach( product => {
            // get all data from the product
            const fields = Object.values( product );

            // determine if any field contains relevant text
            for( let i = 0; i < fields.length; i++ ) {
                const field = String( fields[i] );
                // if this field of product details match the search criteria
                if( field.toLowerCase().includes( searchCriteria.toLowerCase() ) ) {
                    // add that product to display
                    foundProducts.push( product );
                    // then skip the rest of the fields on this product to avoid duplicate matches
                    break;
                }
            }
        });

        // return the list of found products
        return foundProducts;
    };

    const filteredProducts = filterProducts( allProducts );
    const noProductsFound = (
        <div>
            <h2>No products found</h2>
            <p>Try changing your search criteria!</p>
        </div>
    );

    return (
        <div id="all-products-container">
            <input id="searchCriteria"
                type="text"
                onChange={ e => setSearchCriteria(e.target.value) }
            />
            {
                (filteredProducts.length !== 0) ?
                filteredProducts.map( product => <Product id={product.id} key={product.id} /> )
                : noProductsFound
            }
        </div>
    );
}

export default Products;
