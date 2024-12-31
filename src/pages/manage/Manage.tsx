import React, { useEffect, useState, useRef } from "react";
import { Product } from "../../types";
import axios from "axios";
import plus from "../../assets/+.jpg";
import { Bounce, Slide, ToastContainer, toast } from "react-toastify";

const Manage = () => {
  document.title = "Book Manage";
  const [loading, setLoading] = useState<Boolean>(false);
  const [loadingDel, setLoadingDel] = useState<Boolean>(false);
  const [page, setPage] = useState<Boolean>(false);
  const [editPage, setEditPage] = useState<Boolean>(false);
  const [data, setData] = useState<Product[] | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const urlRef = useRef<HTMLInputElement | null>(null);
  const authorRef = useRef<HTMLInputElement | null>(null);
  const sizeRef = useRef<HTMLInputElement | null>(null);
  const publicationRef = useRef<HTMLInputElement | null>(null);
  const genreRef = useRef<HTMLInputElement | null>(null);
  const stockRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);

  const handleCreateOrUpdateElement = (e: React.FormEvent): void => {
    e.preventDefault();

    const newElement: Product = {
      id: currentProduct ? currentProduct.id : Date.now(),
      name: nameRef.current?.value || "",
      url: urlRef.current?.value || "",
      author: authorRef.current?.value || "",
      size: parseInt(sizeRef.current?.value || "0", 10),
      stokc: parseInt(stockRef.current?.value || "0", 10),
      publicatoin: publicationRef.current?.value || "",
      genre: genreRef.current?.value || "",
      description: descriptionRef.current?.value || "",
      price: parseInt(priceRef.current?.value || "0", 10),
    };

    const request = currentProduct
      ? axios.put(
          `https://673206d97aaf2a9aff1327fc.mockapi.io/bookshop/${currentProduct.id}`,
          newElement
        )
      : axios.post(
          "https://673206d97aaf2a9aff1327fc.mockapi.io/bookshop",
          newElement
        );

    request
      .then(() => {
        const message = currentProduct
          ? "Product updated successfully"
          : "🦄 Ma'lumot muvaffaqiyatli qo'shildi!";
        toast.success(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });

        setPage(false);
        setEditPage(false);

        if (!currentProduct) {
          setData((prevData) =>
            prevData ? [...prevData, newElement] : [newElement]
          );
        } else {
          setData((prevData) =>
            prevData
              ? prevData.map((product) =>
                  product.id === newElement.id ? newElement : product
                )
              : []
          );
        }

        // Clear input fields
        nameRef.current!.value = "";
        urlRef.current!.value = "";
        authorRef.current!.value = "";
        sizeRef.current!.value = "";
        publicationRef.current!.value = "";
        genreRef.current!.value = "";
        stockRef.current!.value = "";
        priceRef.current!.value = "";
        descriptionRef.current!.value = "";
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          currentProduct
            ? "Failed to update product!"
            : "Failed to create product!",
          {
            position: "top-right",
            autoClose: 5000,
          }
        );
      });
  };

  const handleDelete = (id: number): void => {
    setLoadingDel(true);
    axios
      .delete(`https://673206d97aaf2a9aff1327fc.mockapi.io/bookshop/${id}`)
      .then(() => {
        setData(
          (prevData) => prevData?.filter((product) => product.id !== id) || null
        );
        toast.success("Product deleted successfully", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored",
          transition: Bounce,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete product!", {
          position: "top-right",
          autoClose: 5000,
        });
      })
      .finally(() => setLoadingDel(false));
  };

  const handleEdit = (product: Product): void => {
    setCurrentProduct(product);
    setEditPage(true);
    setPage(true); // Ensures we are on the 'edit' page
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://673206d97aaf2a9aff1327fc.mockapi.io/bookshop")
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [page]);

  const productElement = data?.map((product) => (
    <div
      key={product.id}
      className="border p-4 rounded-md shadow-md bg-white mb-4 w-[300px]"
    >
      <img
        src={product.url}
        alt={product.name}
        className="w-32 h-32 object-cover"
      />
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <h3 className="text-md text-gray-700">{product.author}</h3>
      <div className="text-sm text-gray-600">
        <p>Size: {product.size}</p>
        <p>Stock: {product.stokc}</p>
        <p>Publication: {product.publicatoin}</p>
        <p>Genre: {product.genre}</p>
        <p>
          Price: <strong>{product.price}</strong>
        </p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => handleEdit(product)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-2"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(product.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
        >
          {loadingDel ? "Deleted..." : "Delete"}
        </button>
      </div>
    </div>
  ));

  return (
    <div className="containerM pt-[80px]">
      {loading && <div className="loader"></div>}
      <div className="flex flex-wrap gap-4">
        {productElement}
        <div className="border p-4 rounded-md shadow-md bg-white mb-4 w-[300px]">
          <img src={plus} alt="+" className="w-full h-2/3" />
          <h1 className="text-center text-[30px]">Add to book</h1>
          <button
            onClick={() => {
              setPage(true);
              setCurrentProduct(null); // Ensure `currentProduct` is null for adding new item
            }}
            className=" bg-blue-800 text-white font-medium px-10 py-3 rounded-xl"
          >
            Add
          </button>
        </div>
      </div>

      {(editPage || page) && (
        <div>
          <h1>{currentProduct ? "Edit Book" : "Add Book"}</h1>
          <form
            onSubmit={handleCreateOrUpdateElement}
            className="p-4 border rounded-md space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Book Name"
              ref={nameRef}
              defaultValue={currentProduct?.name || ""}
              className="p-2 border rounded-md w-full"
              required
            />
            <input
              type="text"
              name="url"
              placeholder="Book Image Link"
              ref={urlRef}
              defaultValue={currentProduct?.url || ""}
              className="p-2 border rounded-md w-full"
              required
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              ref={authorRef}
              defaultValue={currentProduct?.author || ""}
              className="p-2 border rounded-md w-full"
              required
            />
            <input
              type="number"
              name="size"
              placeholder="Pages"
              ref={sizeRef}
              defaultValue={currentProduct?.size || ""}
              className="p-2 border rounded-md w-full"
              required
            />
            <input
              type="text"
              name="publication"
              placeholder="Publication Date"
              ref={publicationRef}
              defaultValue={currentProduct?.publicatoin || ""}
              className="p-2 border rounded-md w-full"
              required
            />
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              ref={genreRef}
              defaultValue={currentProduct?.genre || ""}
              className="p-2 border rounded-md w-full"
              required
            />
            <input
              type="number"
              name="stokc"
              placeholder="Stock"
              ref={stockRef}
              defaultValue={currentProduct?.stokc || ""}
              className="p-2 border rounded-md w-full"
              required
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              ref={priceRef}
              defaultValue={currentProduct?.price || ""}
              className="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              ref={descriptionRef}
              defaultValue={currentProduct?.description || ""}
              className="p-2 border rounded-md w-full"
              required
            />
            <div className="flex space-x-4">
              <button
                type="submit"
                className=" bg-green-800 text-white font-medium px-10 py-3 rounded-xl"
              >
                {currentProduct ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditPage(false);
                  setPage(false);
                }}
                className=" bg-red-800 text-white font-medium px-10 py-3 rounded-xl"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Manage;
