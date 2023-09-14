// tracks which products to show
const filterProducts = ( products, searchCriteria ) => {
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

export default filterProducts;
