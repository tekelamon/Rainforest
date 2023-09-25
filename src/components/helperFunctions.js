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

const addtoCart = ( id, cartEndpoint, currentCart, setCurrentCart ) => {
    // check if item is already in cart
    const isInCart = currentCart.findIndex( item => item.productId === id );
    // -1 means no matches, so
    // if item is not in cart, add item to cart
    if( isInCart === -1 ) {
        // take our current cart
        let cart = JSON.parse( localStorage.getItem(cartEndpoint) );
        // add 1 copy this product
        cart.products.push( { productId: id, quantity: 1 } );
        // update cart
        setCurrentCart( cart.products );
        localStorage.setItem(cartEndpoint, JSON.stringify(cart) );
    }
    // if item is in cart add 1 to quantity
    else {
        let cart = JSON.parse( localStorage.getItem(cartEndpoint) );
        // update quantity
        cart.products[isInCart].quantity++;
        // update cart
        setCurrentCart( cart.products );
        localStorage.setItem(cartEndpoint, JSON.stringify(cart) );
    }
};

export {
    filterProducts,
    addtoCart
}
