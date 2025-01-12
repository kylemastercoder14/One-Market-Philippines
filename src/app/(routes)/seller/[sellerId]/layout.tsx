/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useUser } from "@/hooks/use-user";
import { redirect } from "next/navigation";
import SellerNavbar from "../_components/navbar";
import Sidebar from "./_components/sidebar";

const SellerLayout = async ({ children }: { children: React.ReactNode }) => {
  const { seller, sellerId } = await useUser();
  if (!seller) {
    return redirect("/seller/account/login");
  }
  return (
    <div>
      <SellerNavbar seller={seller} />
      <main className="px-40 py-10 grid md:grid-cols-6 grid-cols-1 gap-4">
        <div className="col-span-1">
          <Sidebar sellerId={sellerId} />
        </div>
        <div className="col-span-5">{children}</div>
      </main>
    </div>
  );
};

export default SellerLayout;
