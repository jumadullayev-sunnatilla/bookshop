import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../types";
import axios from "axios";

const Detail = () => {
  const params = useParams();
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    axios
      .get(`https://673206d97aaf2a9aff1327fc.mockapi.io/bookshop/${params.id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <p className="text-center text-lg font-semibold text-gray-600 mt-10">
        Loading...
      </p>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl min-h-screen flex flex-col md:flex-row items-center">
      {/* Chap tomon - Rasm */}
      <div className="w-full md:w-1/2 h-[400px] md:h-[500px] flex justify-center items-center bg-green-600">
        <img
          src={data?.url}
          alt={data?.name}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>

      {/* O'ng tomon - Ma'lumotlar */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-gray-800">{data?.name}</h1>
        <p className="text-gray-600 mt-4">{data?.description}</p>
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Detail;
