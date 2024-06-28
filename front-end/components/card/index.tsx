import "./index.scss";
import Link from "next/link";

type Props = {
  item?: any;
};

const Card = ({ item }: Props) => {
  // console.log(item);

  return (
    <Link className="link" href={`/product/${item.id}`}>
      <div className="card">
        <div className="image">
          {item?.attributes.isNew && <span>New Season</span>}
          <img
            src={item?.attributes?.thumbnail?.url}
            alt="mainImg"
            className="mainImg"
          />
          <img
            src={item.attributes?.images?.data[0]?.url}
            alt="secondImg"
            className="secondImg"
          />
        </div>
        <h2>{item?.attributes.title}</h2>
        <div className="prices">
          <h3>${item?.attributes.price + 20}</h3>
          <h3>${item?.attributes.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
