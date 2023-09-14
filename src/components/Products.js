import { useState, useEffect } from "react";
import Product from "./Product";
import { getAllProducts, getProductsByCategory } from "./api-services";
import { filterProducts } from "./productFilters";

// display all products returned from api in card elements
function Products() {
    const [allProducts, setAllProducts] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState('');
    const [category, setCategory] = useState(null);

    // get products from api
    useEffect(()=>{
        const getData = async () => {
            if ( category ) {
                const response = await getProductsByCategory( category );
                setAllProducts( response );
            } else {
                const response = await getAllProducts();
                setAllProducts( response );
            }
        }
        getData();
    });

    const filteredProducts = filterProducts( allProducts, searchCriteria );
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
            {/* TODO add buttons to filter by category here */}
            {
                (filteredProducts.length !== 0) ?
                filteredProducts.map( product => <Product id={product.id} key={product.id} /> )
                : noProductsFound
            }
        </div>
    );
}

export default Products;
