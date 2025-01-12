"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Seller } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, StoreIcon } from "lucide-react";
import { logoutSeller } from "@/actions/seller";

const SellerNavbar = ({ seller }: { seller: Seller }) => {
  const handleLogout = async () => {
    await logoutSeller();
    window.location.href = "/seller/account/login";
  };
  return (
    <header className="sticky inset-x-0 top-0 z-10">
      <div className="flex bg-[#f5f5f5] items-center px-40 py-4 font-helveticaRegular justify-between">
        <div className="flex items-center gap-1">
          <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
          <div className="w-4 border border-zinc-600 h-full rotate-90" />
          <p>Seller Hub</p>
        </div>
        <div className="flex items-center gap-5">
          <Link href="#" className="hover:text-orange-600">
            Contact Us
          </Link>
          <p>|</p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex text-sm items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-orange-400">
                    <StoreIcon className="w-4 h-4 text-white" />
                  </AvatarFallback>
                </Avatar>
                {seller.name}
                <ChevronDown className="w-3 h-3" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default SellerNavbar;
