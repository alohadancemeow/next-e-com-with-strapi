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
            src={
              process.env.NEXT_PUBLIC_UPLOAD_URL! +
              item.attributes?.img?.data?.attributes?.url
            }
            alt="mainImg"
            className="mainImg"
          />
          <img
            src={
              process.env.NEXT_PUBLIC_UPLOAD_URL! +
              item.attributes?.img2?.data[0]?.attributes?.url
            }
            alt="secondImg"
            className="secondImg"
          />
        </div>
        <h2>{item?.attributes.title}</h2>
        <div className="prices">
          <h3>${item.oldPrice || item?.attributes.price + 20}</h3>
          <h3>${item?.attributes.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
