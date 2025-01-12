import React from "react";

const Home = async (
  props: {
    params: Promise<{
      sellerId: string;
    }>;
  }
) => {
  const params = await props.params;
  return <div>Home {params.sellerId}</div>;
};

export default Home;
