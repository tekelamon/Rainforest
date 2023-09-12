// A place to hold all api calls to remain DRY and make refactoring easier

const BASE_API = 'https://fakestoreapi.com';
const PRODUCTS = `${BASE_API}/products`;

const getAllProducts = async () => {
    try {
        const response = await fetch(`${PRODUCTS}`);
        const products = await response.json();
        return products;
    } catch (err) {
        console.error( err );
    }
};

const getProductById = async (id) => {
    try {
        const response = await fetch(`${PRODUCTS}/${id}`);
        const product = await response.json();
        return product;
    } catch (err) {
        console.error( err );
    }
}

export {
    getAllProducts,
    getProductById
}