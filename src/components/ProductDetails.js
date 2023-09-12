import { useParams } from "react-router-dom";

const ProductDetails = () => {
    // gets the id of the individual product from the link passed in
    const product = useParams();

    return <p>Product Details for {product.id} </p>;
}

export default ProductDetails;
