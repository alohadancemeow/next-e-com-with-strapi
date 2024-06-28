"use client";

import "./index.scss";
import { useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import useFetchById from "@/hooks/use-fetch-by-id";
import { useAppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/cartReducer";
import Card from "../card";

type Props = {
  id: string;
};

const limit = 3;

const Product = ({ id }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState({
    type: "thumbnail",
    id: 0,
  });

  const dispatch = useAppDispatch();
  const { data, loading, error } = useFetchById(`/products/${id}?populate=*`);
  const { data: relatedProducts, loading: isLoading } = useFetchById(
    `/products?filters[id][$ne]=${id}&pagination[page]=1&pagination[pageSize]=${limit}`
  );

  if (!data) return "loading product data";

  const imageUrl =
    selectedImg.type === "thumbnail"
      ? data?.attributes?.[selectedImg.type]?.url
      : data?.attributes[selectedImg.type]?.data[selectedImg.id]?.url;

  const handleAddToCart = () =>
    dispatch(
      addToCart({
        id: data.id,
        title: data.attributes.title,
        desc: data.attributes.desc,
        price: data.attributes.price,
        img: data?.attributes?.thumbnail?.url,
        quantity,
      })
    );

  return (
    <>
      <div className="product">
        {loading ? (
          "loading"
        ) : (
          <>
            <div className="left">
              <div className="images">
                {data?.attributes?.images?.data?.map((image: any) => (
                  <img
                    key={image?.id}
                    src={
                      image?.url ||
                      "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt="image"
                    onClick={() =>
                      setSelectedImg({
                        type: "images",
                        id: image?.id - 1,
                      })
                    }
                  />
                ))}
              </div>
              <div className="mainImg">
                <img src={imageUrl} alt="" />
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
              </div>
              <div className="info">
                <span>Vendor: Polo</span>
                <span>Product Type: T-Shirt</span>
                <span>Tag: T-Shirt, Women, Top</span>
              </div>
              <hr />
            </div>
          </>
        )}
      </div>

      {!!relatedProducts?.length && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0 200px",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            You might also like
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            {relatedProducts?.map((p: any) => (
              <Card key={p?.id} item={p} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
