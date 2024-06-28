import Products from "@/components/products";

type Props = {
  params: { id: string };
};

const CategoryPage = ({ params }: Props) => {
  return <Products id={params.id} />;
};

export default CategoryPage;
