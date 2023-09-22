// A place to hold all api calls to remain DRY and make refactoring easier

const BASE_API = 'https://fakestoreapi.com';
const PRODUCTS = `${BASE_API}/products`;
const ALL_CATEGORIES = `${PRODUCTS}/categories`;
const CATEGORIES = `${PRODUCTS}/category`;
const USERS = `${BASE_API}/users`;
const LOGIN = `${BASE_API}/auth/login`;

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

const createUser = async (user) => {
    try {
        const message = {
            method:"POST",
            body:JSON.stringify(
                {
                    email:`${user.email}`,
                    username:`${user.username}`,
                    password:`${user.password}`,
                    name:{
                        firstname:`${user.firstName}`,
                        lastname:`${user.lastName}`
                    },
                    address:{
                        city:`${user.city}`,
                        street:`${user.street}`,
                        zipcode:`${user.zip}`
                    },
                    phone:`${user.phoneNumber}`
                }
            )
        };
        const response = await fetch(`${USERS}`, message );
        const createUserResponse = await response.json();
        return createUserResponse;
    } catch (err) {
        console.error( err );
    }
};

const loginUser = async (input) => {
    try {
        const message = {
            method:"POST",
            body:JSON.stringify(
                {
                    username:`${input.username}`,
                    password:`${input.password}`
                }
            ),
            headers:{
                "Content-Type":"application/json"
            },
            redirect:"follow"
        };
        const response = await fetch(`${LOGIN}`, message );
        const result = await response.json();
        return result;
    } catch (err) {
        console.error( err );
    }
};

export {
    getAllProducts,
    getProductById,
    getAllCategories,
    getProductsByCategory,
    createUser,
    loginUser
}
