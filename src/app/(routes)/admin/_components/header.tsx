"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const Header = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  // Remove "admin" from pathSegments
  const filteredSegments = pathSegments.filter(
    (segment) => segment !== "admin"
  );

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 h-4 md:block hidden"
        />
        <Breadcrumb className="md:block hidden">
          <BreadcrumbList>
            {filteredSegments.map((segment, index) => {
              const displayName = segment.replace("-", " "); // Replace dash with space for each segment
              const breadcrumbPath = `/admin/${filteredSegments.slice(0, index + 1).join("/")}`;
              const isLast = index === filteredSegments.length - 1;

              return (
                <React.Fragment key={breadcrumbPath}>
                  <BreadcrumbItem className="capitalize">
                    {isLast ? (
                      <span>{displayName}</span>
                    ) : (
                      <Link href={breadcrumbPath} passHref>
                        <BreadcrumbLink asChild>
                          <span>{displayName}</span>
                        </BreadcrumbLink>
                      </Link>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default Header;
