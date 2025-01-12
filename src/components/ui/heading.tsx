import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const Heading = ({
  link,
  title,
  href,
}: {
  link: string;
  title: string;
  href: string;
}) => {
  return (
    <div className="">
      <Link href={href} className="text-sm flex items-center gap-1 hover:text-orange-600 text-muted-foreground">
        <ChevronLeft className="w-4 h-4" />
        <span>{link}</span>
      </Link>
      <p className="text-xl font-semibold mt-1">{title}</p>
    </div>
  );
};

export default Heading;
