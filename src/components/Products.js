import { useState, useEffect } from "react";
import Product from "./Product";
import {
    getAllProducts,
    getProductsByCategory,
    getAllCategories } from "./api-services";
import { filterProducts } from "./helperFunctions";

// display all products returned from api in card elements
function Products( { userEndpoint, cartEndpoint, currentCart, setCurrentCart } ) {
    const [allProducts, setAllProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    const [category, setCategory] = useState(null);
    const [searchCriteria, setSearchCriteria] = useState('');

    const [sortOrder, setSortOrder] = useState(false);

    const [fail, setFail] = useState(false);

    // get categories from api
    useEffect(()=>{
        const getCategories = async () => {
            const response = await getAllCategories();
            // if api request fails, update fail state and stop execution of function
            if( !response ) { setFail(true); return; }
            setAllCategories( response );
        }
        getCategories();
    },[]);

    // get products from api
    useEffect(()=>{
        const getData = async () => {
            if ( category ) {
                const response = await getProductsByCategory( category );
                // if api request fails, update fail state and stop execution of function
                if( !response ) { setFail(true); return; }
                if( sortOrder ) { response.reverse() };
                setAllProducts( response );
            } else {
                const response = await getAllProducts();
                // if api request fails, update fail state and stop execution of function
                if( !response ) { setFail(true); return; }
                if( sortOrder ) { response.reverse() };
                setAllProducts( response );
            }
        }
        getData();
    },[category, sortOrder]);

    // filter for text input
    const filteredProducts = filterProducts( allProducts, searchCriteria );

    const noProductsFound = (
        <div>
            <h2>No products found</h2>
            <p>Try changing your search criteria!</p>
        </div>
    );

    // control for category search 
    const categoryButtons = allCategories.map( currentCategory => {
        return (
            <option value={currentCategory} >{currentCategory.toUpperCase()}</option>
        )
    })

    return (!fail) ? (
        <div id="all-products-container">
            <div id="products-page-inputs" >
                <input id="searchCriteria"
                    type="text"
                    onChange={ e => setSearchCriteria(e.target.value) }
                />
                <select name="category" id="category" defaultValue="" onChange={e=>setCategory(e.target.value)} >
                    <option value="" >ALL</option>
                    {
                        categoryButtons
                    }
                </select>
                <button onClick={()=>setSortOrder(!sortOrder)}>{sortOrder ? "Descending" : "Ascending"}</button>
            </div>
            <div id="all-products-cards" >
            {
                ( filteredProducts.length !== 0 ) ? (
                    filteredProducts.map( product =>
                        <Product
                            product={product}
                            key={product.id}
                            cartEndpoint={cartEndpoint}
                            currentCart={currentCart}
                            setCurrentCart={setCurrentCart}
                        />
                    )
                ) : (
                    noProductsFound
                )
            }
            </div>
        </div>
    ) : (
        <div id="all-products-container">
            <p>We're having troubling communicating with our servers...</p>
        </div>
    );
}

export default Products;
