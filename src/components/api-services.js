// A place to hold all api calls to remain DRY and make refactoring easier

const BASE_API = 'https://fakestoreapi.com';
const PRODUCTS = `${BASE_API}/products`;
const ALL_CATEGORIES = `${PRODUCTS}/categories`;
const CATEGORIES = `${PRODUCTS}/category`;

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
};

const getAllCategories = async () => {
    try {
        const response = await fetch(`${ALL_CATEGORIES}`);
        const categories = await response.json();
        return categories;
    } catch (err) {
        console.error( err );
    }
}

const getProductsByCategory = async (category) => {
    try {
        const response = await fetch(`${CATEGORIES}/${category}`);
        const products = await response.json();
        return products;
    } catch (err) {
        console.error( err );
    }
};

export {
    getAllProducts,
    getProductById,
    getAllCategories,
    getProductsByCategory
}
