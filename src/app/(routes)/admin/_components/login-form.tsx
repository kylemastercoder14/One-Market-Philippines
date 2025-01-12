"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    setLoading(true);
    toast.success("Login successful. Redirecting to dashboard...");
    setTimeout(() => {
      setLoading(false);
      router.push("/admin/dashboard");
    }, 2000);
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form autoComplete='off'>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  disabled={loading}
                  required
                />
              </div>
              <div className="grid relative gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  disabled={loading}
                  placeholder="--------"
                  required
                />
                <Button
                  onClick={handleShowPassword}
                  disabled={loading}
                  type="button"
                  className="absolute top-6 right-1 hover:bg-transparent text-muted-foreground"
                  size="icon"
                  variant="ghost"
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </Button>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                type="submit"
                className="w-full"
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
