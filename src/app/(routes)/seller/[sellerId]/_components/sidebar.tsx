"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  MdHomeFilled,
  MdShoppingBag,
  MdWallet,
  MdAnnouncement,
  MdVerifiedUser,
  MdFeedback,
  MdFileCopy,
  MdHelpCenter,
} from "react-icons/md";
import { IoMdListBox } from "react-icons/io";

const Sidebar = ({ sellerId }: { sellerId: string }) => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (title: string) => {
    setOpenMenu((prev) => (prev === title ? null : title));
  };

  const navLinks = [
    {
      title: "Homepage",
      icon: <MdHomeFilled className="w-6 h-6" />,
      href: `/seller/${sellerId}/home`,
      isSingle: true,
    },
    {
      title: "Products",
      icon: <MdShoppingBag className="w-6 h-6" />,
      href: "",
      isSingle: false,
      subLinks: [
        {
          title: "Add Product",
          href: `/seller/${sellerId}/products/create`,
        },
        {
          title: "Manage Products",
          href: `/seller/${sellerId}/products/manage`,
        },
      ],
    },
    {
      title: "Orders",
      icon: <MdWallet className="w-6 h-6" />,
      href: "",
      isSingle: false,
      subLinks: [
        {
          title: "Add Product",
          href: `/seller/${sellerId}/products/create`,
        },
        {
          title: "Manage Products",
          href: `/seller/${sellerId}/products/manage`,
        },
      ],
    },
    {
      title: "Promotions",
      icon: <MdAnnouncement className="w-6 h-6" />,
      href: "",
      isSingle: false,
      subLinks: [
        {
          title: "Add Product",
          href: `/seller/${sellerId}/products/create`,
        },
        {
          title: "Manage Products",
          href: `/seller/${sellerId}/products/manage`,
        },
      ],
    },
    {
      title: "Customers",
      icon: <MdVerifiedUser className="w-6 h-6" />,
      href: `/seller/${sellerId}/customers`,
      isSingle: true,
    },
    {
      title: "Inventory",
      icon: <IoMdListBox className="w-6 h-6" />,
      href: `/seller/${sellerId}/inventory`,
      isSingle: true,
    },
    {
      title: "Feedbacks",
      icon: <MdFeedback className="w-6 h-6" />,
      href: `/seller/${sellerId}/feedbacks`,
      isSingle: true,
    },
    {
      title: "Returns & Refunds",
      icon: <MdFileCopy className="w-6 h-6" />,
      href: `/seller/${sellerId}/returns-refunds`,
      isSingle: true,
    },
    {
      title: "Help Center",
      icon: <MdHelpCenter className="w-6 h-6" />,
      href: `/seller/${sellerId}/help-center`,
      isSingle: true,
    },
  ];
  return (
    <div className="overflow-y-auto max-h-screen bg-white shadow-md py-5 px-3">
      <div className="flex flex-col space-y-2">
        {navLinks.map((link) => (
          <div key={link.title} className="w-full">
            <div
              className={`flex items-center justify-between text-muted-foreground ${pathname === link.href ? "text-orange-600" : ""} hover:text-orange-600 px-3 py-2 gap-2 transition-all hover:bg-orange-200/40 cursor-pointer ${
                openMenu === link.title && "bg-orange-100"
              }`}
              onClick={() => (link.isSingle ? null : toggleMenu(link.title))}
            >
              <div className="flex items-center gap-2">
                {link.icon}
                <span className="text-sm font-semibold">{link.title}</span>
              </div>
              {!link.isSingle && (
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openMenu === link.title ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>
            {!link.isSingle && (
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openMenu === link.title ? "max-h-[200px]" : "max-h-0"
                }`}
              >
                <div className="mt-2 flex flex-col w-full space-y-1">
                  {link.subLinks?.map((subLink) => (
                    <Link
                      key={subLink.href}
                      href={subLink.href}
                      className="flex items-center w-full justify-between text-muted-foreground hover:text-orange-600 px-3 py-2 gap-2 transition-all hover:bg-orange-200/40 cursor-pointer"
                    >
                      <span className="ml-8">{subLink.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
