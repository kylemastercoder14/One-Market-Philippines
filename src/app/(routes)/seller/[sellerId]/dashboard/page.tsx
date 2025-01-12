import React from "react";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import Image from "next/image";
import SettingUpForm from "../_components/setting-up-form";
import { Badge } from "@/components/ui/badge";

const SellerDashboard = async (
  props: {
    params: Promise<{
      sellerId: string;
    }>;
  }
) => {
  const params = await props.params;
  const seller = await db.seller.findUnique({
    where: {
      id: params.sellerId,
    },
  });

  if (seller?.residentialAddress) {
    return redirect(`/seller/${params.sellerId}/home`);
  }

  return (
    <div>
      <Modal className="p-0 max-w-4xl overflow-hidden" isOpen>
        <div className="grid md:grid-cols-5 grid-cols-1 gap-4">
          <div className="col-span-1 p-3 relative bg-orange-600 rounded-s-md flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <Image
                src="/images/setting-up.png"
                alt="Setting up"
                className="pointer-events-none select-none"
                width={100}
                height={100}
              />
              <Badge className="bg-orange-400 pointer-events-none select-none px-10 hover:bg-white text-black">
                Start
              </Badge>
            </div>
            <div className="absolute -bottom-10 -right-10">
              <Image
                src="/images/circle.png"
                alt="Circle"
                className="pointer-events-none select-none"
                width={110}
                height={110}
              />
            </div>
            <div className="absolute -top-10 -left-10">
              <Image
                src="/images/circle.png"
                alt="Circle"
                className="pointer-events-none select-none"
                width={110}
                height={110}
              />
            </div>
          </div>
          <div className="col-span-4 py-5 px-3">
            <h1 className="text-lg font-semibold mt-5">
              Let&apos;s set up your shop first before adding products
            </h1>
            <SettingUpForm sellerId={seller?.id as string} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SellerDashboard;
