"use client";

import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import OnboardingForm from "../../_components/onboarding-form";

const Onboarding = () => {
  return (
    <>
      <header className="sticky bg-white inset-x-0 top-0 z-50">
        <div className="flex border-b items-center px-40 py-4 font-helveticaRegular justify-between">
          <div className="flex items-center gap-1">
            <Image src="/images/logo.png" alt="Logo" width={60} height={60} />
            <div className="w-4 border border-zinc-600 h-full rotate-90" />
            <p>Seller Hub</p>
          </div>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-orange-600">
              Contact Us
            </Link>
            <Link href="/seller/account/login" className="hover:text-orange-600">
              <Button className="bg-orange-600 hover:bg-orange-600/80">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="max-w-4xl mx-auto py-10">
        <p className="font-semibold text-2xl">Upload Documents</p>
        <div className="bg-white shadow-sm rounded-md border mt-4 mb-4 p-3 flex items-center gap-6">
          <Image alt="Store" src="/images/store.png" width={100} height={100} />
          <div>
            <p className="text-lg font-semibold">Your shop preference</p>
            <p className="text-muted-foreground">
              Let&apos;s get started to create your shop.
            </p>
          </div>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <OnboardingForm />
        </Suspense>
      </div>
    </>
  );
};

export default Onboarding;
