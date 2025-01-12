import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import LoginForm from '../../_components/login-form';

const Login = () => {
  return (
    <>
      <header className="sticky inset-x-0 bg-white top-0 z-50">
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
      <div className="w-full relative place-items-center grid md:grid-cols-10 grid-cols-1 px-80 gap-10 mt-20">
        <div className="h-[500px] w-full col-span-6">
          <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
            Grow your business with{" "}
            <span className="text-orange-600">1 Market Philippines</span> today!
          </h2>
          <p className="text-sm md:text-lg text-neutral-700 dark:text-neutral-400">
            If you are a retailer, brand or business with products to sell, you
            can sell on{" "}
            <span className="text-orange-600">1 Market Philippines</span> no
            matter how many products you have. We can help accelerate your
            traffic.
          </p>
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.1}
            duration={3}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
            )}
          />
        </div>
        <div className="col-span-4">
          <div className="bg-white shadow-lg border px-6 py-6 rounded-md">
            <h3 className="font-helveticaBold text-2xl">Login</h3>
            <div className="flex items-center gap-2">
              <p className="text-sm">
                Don&apos;t have an account yet?{" "}
              </p>
              <Link
                href="/seller/account/register"
                className="text-orange-600 hover:underline text-sm"
              >
                Sign Up
              </Link>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
