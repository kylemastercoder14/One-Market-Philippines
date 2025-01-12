import React from "react";
import { DataTable } from "@/components/ui/data-table";
import { columns, SellersColumn } from "./column";

const SellersClient = ({ data }: { data: SellersColumn[] }) => {
  return (
    <div>
      <DataTable
        loading
        searchKey="name"
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default SellersClient;
