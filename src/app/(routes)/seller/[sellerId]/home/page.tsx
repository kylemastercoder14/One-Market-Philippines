import React from "react";

const Home = async ({
  params,
}: {
  params: {
    sellerId: string;
  };
}) => {
  return <div>Home {params.sellerId}</div>;
};

export default Home;
