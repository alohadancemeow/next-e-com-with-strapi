"use client";

import "./index.scss";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { removeItem, resetCart } from "@/redux/cartReducer";
// import { makeRequest } from "../../makeRequest";
// import { loadStripe } from "@stripe/stripe-js";

const data = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    img2: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "test product",
    desc: "this is a test peoduct",
    isNew: true,
    oldPrice: 19,
    price: 12,
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    img2: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "test product",
    desc: "this is a test peoduct",
    isNew: true,
    oldPrice: 19,
    price: 12,
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    img2: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "test product",
    desc: "this is a test peoduct",
    isNew: true,
    oldPrice: 19,
    price: 12,
  },
];

const Cart = () => {
  const products = useAppSelector((state) => state.cart.products);
  const dispatch = useAppDispatch();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item: any) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  //   const stripePromise = loadStripe(
  //     "pk_test_eOTMlr8usx1ctymXqrik0ls700lQCsX2UB"
  //   );
  //   const handlePayment = async () => {
  //     try {
  //       const stripe = await stripePromise;
  //       const res = await makeRequest.post("/orders", {
  //         products,
  //       });
  //       await stripe.redirectToCheckout({
  //         sessionId: res.data.stripeSession.id,
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {products?.map((item: any) => (
        <div className="item" key={item.id}>
          <img src={process.env.NEXT_PUBLIC_UPLOAD_URL + item.img} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.desc?.substring(0, 100)}</p>
            <div className="price">
              {item.quantity} x ${item.price}
            </div>
          </div>
          <DeleteOutlinedIcon
            className="delete"
            onClick={() => dispatch(removeItem(item.id))}
          />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>${totalPrice()}</span>
      </div>
      <button
      //   onClick={handlePayment}
      >
        PROCEED TO CHECKOUT
      </button>
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;
