import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";
import { Pagination } from "@mui/material";
import { Helmet } from "react-helmet";

export default function Brands() {
  const [brands, setBrands] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const getBrands = () => {
    setLoading(true);

    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/brands?limit=20&page=${page}`
      )
      .then(({ data }) => {
        setPages(data?.metadata.numberOfPages);
        setBrands(data.data);
        setLoading(false);
      })
      .catch(({ error }) => {
        setLoading(false);
        toast.error(error);
      });
  };

  const handleChangeResult = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getBrands();
  }, [page]);

  if (loading) return <Loading></Loading>;

  return (
    <div className="row py-5 gy-5 gx-3  ">
      <Helmet>
        <title>Brands</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <h2 className="fw-bold text-main">All Brands</h2>
      {brands?.map((brand) => (
        <Brand brand={brand} key={brand._id} />
      ))}

      <div className="col-12 d-flex justify-content-center">
        <Pagination
          count={pages}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={handleChangeResult}
        />
      </div>
    </div>
  );
}

function Brand({ brand }) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 px-2">
      <div className="shadow pb-2 rounded-2 border overflow-hidden ">
        <img
          src={brand.image}
          alt={brand.name}
          className="w-100"
          height={250}
        />
        <h2 className="fs-5 fw-bold text-main text-center mt-2">
          {brand.name}
        </h2>
      </div>
    </div>
  );
}
