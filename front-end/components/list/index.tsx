"use client";

import "./index.scss";
import Card from "../card";
import useFetch from "@/hooks/use-fetch";

type Props = {
  subCats?: any;
  maxPrice?: any;
  sort?: any;
  catId?: number;
};

const List = ({ subCats, maxPrice, sort, catId }: Props) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&filters[categories][id]=${catId}${subCats.map(
      (item: any) => `&filters[sub_categories][id][$eq]=${item}`
    )}&filters[price][$lte]=${maxPrice}&sort=price:${sort}`
  );

  return (
    <div className="list">
      {loading
        ? "loading"
        : data?.map((item: any) => <Card item={item} key={item.id} />)}
    </div>
  );
};

export default List;
