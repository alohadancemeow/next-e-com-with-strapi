import Product from "@/components/product";
import React from "react";

type Props = {
  params: { id: string };
};

const ProductPage = ({ params }: Props) => {
  return <Product />;
};

export default ProductPage;
