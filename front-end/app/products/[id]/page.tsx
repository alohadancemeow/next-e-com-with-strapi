import Products from "@/components/products";

type Props = {
  params: { id: string };
};

const ProductsPage = ({ params }: Props) => {
  return <Products id={params.id} />;
};

export default ProductsPage;
