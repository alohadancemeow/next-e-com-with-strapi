"use client";

import "./index.scss";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import { removeItem, resetCart } from "@/redux/cartReducer";
import { getStripe } from "@/lib/stripe-client";
import { makeRequest } from "@/hooks/use-fetch";

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

  const handlePayment = async () => {
    try {
      const stripe = await getStripe();

      const res = await makeRequest.post("/orders", {
        products,
      });

      if (res.status === 200) {
        dispatch(resetCart());
      }

      await stripe?.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Check to see if this is a redirect back from Checkout
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {products?.map((item: any) => (
        <div className="item" key={item.id}>
          <img src={item.img} alt="" />
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
      <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
      <span className="reset" onClick={() => dispatch(resetCart())}>
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;
