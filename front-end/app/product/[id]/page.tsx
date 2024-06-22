import Product from "@/components/product";

type Props = {
  params: { id: string };
};

const ProductPage = ({ params }: Props) => {
  return <Product id={params.id} />;
};

export default ProductPage;
