import { useEffect, useState } from "react";
import { Product } from "../../types";
import axios from "axios";
import { NavLink } from "react-router-dom";
const HomeBook = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [data, setData] = useState<Product[] | null>(null);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://673206d97aaf2a9aff1327fc.mockapi.io/bookshop")
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);
  console.log(data);
  const productElement: JSX.Element[] | undefined = data?.map(
    (product: Product): JSX.Element => (
      <div
        key={product.id}
        className=" p-2 rounded-md shadow-md bg-white w-[250px] flex-shrink-0"
      >
        <img
          src={product.url}
          alt={product.name}
          className="w-[300px] h-[283px] object-cover"
        />
        <NavLink to={`/product/${product.id}`}>
          <h2 className="text-xl font-bold mt-2">{product.name}</h2>
          <h3 className="text-md text-gray-700">{product.author}</h3>
        </NavLink>
      </div>
    )
  );

  return (
    <div className="containerM ">
      {loading && <div className="loader"></div>}
      <div className="flex gap-3 overflow-x-auto whitespace-nowrap">
        {productElement}
      </div>
    </div>
  );
};

export default HomeBook;
