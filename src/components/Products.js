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

    // get categories from api
    useEffect(()=>{
        const getCategories = async () => {
            const response = await getAllCategories();
            setAllCategories( response );
        }
        getCategories();
    },[]);

    // get products from api
    useEffect(()=>{
        const getData = async () => {
            if ( category ) {
                const response = await getProductsByCategory( category );
                if( sortOrder ) { response.reverse() };
                setAllProducts( response );
            } else {
                const response = await getAllProducts();
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
            <div key={currentCategory}>
                <input type="radio"
                    id={currentCategory}
                    name="category"
                    value={currentCategory}
                    onClick={()=>setCategory(currentCategory)}
                />
                <label htmlFor={currentCategory}>{currentCategory.toUpperCase()}</label>
            </div>
        )
    })

    return (
        <div id="all-products-container">
            <div id="products-page-inputs" >
                <input id="searchCriteria"
                    type="text"
                    onChange={ e => setSearchCriteria(e.target.value) }
                />
                <input type="radio"
                    id="allbtn"
                    name="category"
                    value="All"
                    onClick={()=>setCategory(null)}
                />
                <label htmlFor="allbtn">ALL</label>
                {
                    categoryButtons
                }
                <input type="radio"
                    id="sortasc"
                    name="sorter"
                    value="ascending"
                    onClick={()=>setSortOrder(false)}
                    defaultChecked
                />
                <label htmlFor="sortasc" >Ascending</label>
                <input type="radio"
                    id="sortdesc"
                    name="sorter"
                    value="descending"
                    onClick={()=>setSortOrder(true)}
                />
                <label htmlFor="sortdesc" >Descending</label>
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
    );
}

export default Products;
