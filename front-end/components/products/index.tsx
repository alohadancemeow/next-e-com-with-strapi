"use client";

import { ChangeEvent, useState } from "react";
import "./index.scss";
import List from "../list";
import useFetch from "@/hooks/use-fetch";
import useFetchById from "@/hooks/use-fetch-by-id";

type Props = {
  id: string;
};

const Products = ({ id }: Props) => {
  const catId = parseInt(id);

  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState("desc");
  const [selectedSubCats, setSelectedSubCats] = useState<string[]>([]);

  const { data: category } = useFetchById(`/categories/${id}`);
  const {
    data: subCategories,
    loading,
    error,
  } = useFetch(`/sub-categories?filters[categories][id][$eq]=${catId}`);

  console.log(category, "category");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>{category?.attributes?.title || "product category"}</h2>
          {subCategories?.map((item: any) => (
            <div className="inputItem" key={item.id}>
              <input
                type="checkbox"
                id={item.id}
                value={item.id}
                onChange={handleChange}
              />
              <label htmlFor={item.id}>{item.attributes.title}</label>
            </div>
          ))}
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSort("asc")}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSort("desc")}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img
          className="catImg"
          src={
            `${category?.attributes?.cover_image?.url}` ||
            "https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
          }
          alt=""
        />
        <List
          catId={catId}
          maxPrice={maxPrice}
          sort={sort}
          subCats={selectedSubCats}
        />
      </div>
    </div>
  );
};

export default Products;
