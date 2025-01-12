import React from "react";
import db from "@/lib/db";
import Heading from "../../_components/heading";
import { format } from "date-fns";
import SellersClient from "./_components/client";
import { SellersColumn } from "./_components/column";

const Sellers = async () => {
  const sellers = await db.seller.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedData: SellersColumn[] =
    sellers.map((item) => ({
      id: item.id,
      name: item.name || "N/A",
      category: item.category || "N/A",
      type: item.type || "N/A",
      status: "Pending",
      createdAt: format(item.createdAt, "MMMM dd, yyyy hh:mm a"),
    })) || [];

  return (
    <div>
      <Heading
        title="Sellers Account"
        description="You can manage the sellers account here."
      />
      <SellersClient data={formattedData} />
    </div>
  );
};

export default Sellers;
