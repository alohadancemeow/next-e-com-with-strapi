"use client";

import "./index.scss";
import { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";

import useFetchById from "@/hooks/use-fetch-by-id";
import { useAppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/cartReducer";

type Props = {
  id: string;
};

const Product = ({ id }: Props) => {
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useAppDispatch();

  const { data, loading, error } = useFetchById(`/products/${id}?populate=*`);

  if (!data) return "loading product data";

  const imageUrl =
    selectedImg !== "img2"
      ? data?.attributes?.[selectedImg]?.data?.attributes?.url
      : data?.attributes[selectedImg]?.data[0]?.attributes?.url;

  const handleAddToCart = () =>
    dispatch(
      addToCart({
        id: data.id,
        title: data.attributes.title,
        desc: data.attributes.desc,
        price: data.attributes.price,
        img: data.attributes.img.data.attributes.url,
        quantity,
      })
    );

  return (
    <div className="product">
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="left">
            <div className="images">
              <img
                src={
                  process.env.NEXT_PUBLIC_UPLOAD_URL! +
                  data?.attributes?.img?.data?.attributes?.url
                }
                // src="https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="image"
                onClick={(e) => setSelectedImg("img")}
              />
              <img
                src={
                  process.env.NEXT_PUBLIC_UPLOAD_URL! +
                  data?.attributes?.img2?.data[0]?.attributes?.url
                }
                // src="https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                onClick={(e) => setSelectedImg("img2")}
              />
            </div>
            <div className="mainImg">
              <img
                src={process.env.NEXT_PUBLIC_UPLOAD_URL! + imageUrl}
                // src="https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
          </div>
          <div className="right">
            <h1>{data?.attributes?.title}</h1>
            <span className="price">${data?.attributes?.price}</span>
            <p>{data?.attributes?.desc}</p>
            <div className="quantity">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button
                disabled={loading}
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button className="add" onClick={handleAddToCart}>
              <AddShoppingCartIcon /> ADD TO CART
            </button>
            <div className="links">
              <div className="item">
                <FavoriteBorderIcon /> ADD TO WISH LIST
              </div>
              <div className="item">
                <BalanceIcon /> ADD TO COMPARE
              </div>
            </div>
            <div className="info">
              <span>Vendor: Polo</span>
              <span>Product Type: T-Shirt</span>
              <span>Tag: T-Shirt, Women, Top</span>
            </div>
            <hr />
            <div className="info">
              <span>DESCRIPTION</span>
              <hr />
              <span>ADDITIONAL INFORMATION</span>
              <hr />
              <span>FAQ</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
