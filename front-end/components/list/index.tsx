import "./index.scss";
// import useFetch from "../../hooks/useFetch";
import Card from "../card";

type Props = {
  subCats?: any;
  maxPrice?: any;
  sort?: any;
  catId?: string;
};

const List = ({ subCats, maxPrice, sort, catId }: Props) => {
  //   const { data, loading, error } = useFetch(
  //     `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
  //       (item) => `&[filters][sub_categories][id][$eq]=${item}`
  //     )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  //   );

  const data: any = [];
  const loading = false;

  return (
    <div className="list">
      {loading
        ? "loading"
        : data?.map((item: any) => <Card item={item} key={item.id} />)}
    </div>
  );
};

export default List;
