import React from "react";
import Heading from "@/components/ui/heading";
import ProductForm from "../_components/product-form";

const CreateProduct = async ({ params }: { params: { sellerId: string } }) => {
  return (
    <>
      <Heading
        link="Manage Products"
        title="Add new product"
        href={`/seller/${params.sellerId}/products`}
      />
      <ProductForm sellerId={params.sellerId} />
    </>
  );
};

export default CreateProduct;
