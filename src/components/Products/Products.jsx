import Loading from "../Loading/Loading";
import useProducts from "../../useProducts";
import Product from "../Product/product";
import { getProducts } from "../../useProducts";
import { Helmet } from "react-helmet";
import { useState } from "react";
import style from "./products.module.css";

export default function Products() {
  const { data, isLoading, isError, error } = useProducts(
    "products",
    getProducts
  );
  const [searchResult, setSearchResult] = useState([]);

  if (isLoading) return <Loading></Loading>;

  if (isError)
    return <div className="alert alert-danger mt-5">{error.message}</div>;

  const handleSearch = (e) => {
    const term = e.target.value.trim("").toLowerCase();

    const products = data?.filter((product) =>
      product.title.toLowerCase().includes(term)
    );

    setSearchResult(products);
  };

  return (
    <div className="products container py-3 my-5">
      <Helmet>
        <title>Products</title>
        <meta name="description" content="Helmet application" />
      </Helmet>

      <div className={`row mb-5 w-50 ${style.search}`}>
        <input
          type="search"
          placeholder="Search for products..."
          className="form-control rounded-pill"
          onChange={handleSearch}
        />
      </div>
      <div className="row gy-5">
        {searchResult.length
          ? searchResult.map((product) => {
              return <Product product={product} key={product._id}></Product>;
            })
          : data?.map((product) => {
              return <Product product={product} key={product._id}></Product>;
            })}
      </div>
    </div>
  );
}
