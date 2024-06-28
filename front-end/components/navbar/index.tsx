"use client";

import "./index.scss";
import React, { useState } from "react";
import Link from "next/link";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import Cart from "../cart";
import { useAppSelector } from "@/redux/store";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const products = useAppSelector((state) => state.cart.products);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div
          style={{
            fontSize: "30px",
            letterSpacing: "2px",
            fontWeight: "bold",
          }}
        >
          <Link className="link" href="/">
            Store
          </Link>
        </div>
        <div className="right">
          <div className="item">
            <Link className="link" href="#featured">
              Featured
            </Link>
          </div>
          <div className="item">
            <Link className="link" href="#category">
              Categories
            </Link>
          </div>
          <div className="item">
            <Link className="link" href="#trending">
              Trendings
            </Link>
          </div>

          <div className="icons">
            <SearchIcon />
            <PersonOutlineOutlinedIcon />
            <FavoriteBorderOutlinedIcon />
            <div className="cartIcon" onClick={() => setOpen(!open)}>
              <ShoppingCartOutlinedIcon />
              {!!products.length && <span>{products.length}</span>}
            </div>
          </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  );
};

export default Navbar;
