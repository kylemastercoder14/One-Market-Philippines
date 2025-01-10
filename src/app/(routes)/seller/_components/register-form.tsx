/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";
import { createSeller, sendOtpCode } from "@/actions/seller";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  emailVerificationCode: z
    .string()
    .min(1, { message: "Email Verification Code is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm password is required" }),
});

const refinedFormSchema = formSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

const RegisterForm = () => {
  const router = useRouter();
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [disableSendCode, setDisableSendCode] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    hasNumber: false,
    hasLetter: false,
    hasSpecialChar: false,
    isValidLength: false,
  });

  const checkPasswordRequirements = (password: string) => {
    setPasswordRequirements({
      hasNumber: /\d/.test(password),
      hasLetter: /[a-zA-Z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      isValidLength: password.length >= 6 && password.length <= 20,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      emailVerificationCode: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const res = await createSeller(values);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.success);
        setTimeout(
          () =>
            router.push(
              `/seller/account/onboarding?email=${res.seller?.email}`
            ),
          2000
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const handleSendOtp = async () => {
    try {
      const res = await sendOtpCode(form.getValues("email"));
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.success);
        setDisableSendCode(true);
        setResendTimer(60);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  return (
    <Form {...form}>
      <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 mt-5">
          <FormField
            control={form.control}
            name="email"
            disabled={loading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    {...field}
                    onChange={(e) => {
                      const email = e.target.value.trim();
                      field.onChange(e);
                      const isValidEmail =
                        formSchema.shape.email.safeParse(email).success;
                      setDisableSendCode(!isValidEmail);
                      setShowVerificationInput(email.length > 0);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {showVerificationInput && (
            <FormField
              control={form.control}
              name="emailVerificationCode"
              disabled={loading}
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Email Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the email verification code"
                      {...field}
                    />
                  </FormControl>
                  <Button
                    disabled={disableSendCode || resendTimer > 0 || loading}
                    onClick={handleSendOtp}
                    type="button"
                    className="absolute text-orange-600 top-[26px] right-1 hover:bg-transparent font-semibold hover:text-orange-600/70"
                    size="sm"
                    variant="ghost"
                  >
                    {resendTimer > 0
                      ? `Resend in ${resendTimer}s`
                      : "Send Code"}
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="password"
              disabled={loading}
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter a password"
                      {...field}
                      onChange={(e) => {
                        const pwd = e.target.value;
                        field.onChange(e);
                        setPassword(pwd);
                        checkPasswordRequirements(pwd);
                      }}
                    />
                  </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-xs text-muted-foreground mt-2">
              <p
                className={`${
                  passwordRequirements.hasNumber &&
                  passwordRequirements.hasLetter &&
                  passwordRequirements.hasSpecialChar
                    ? "text-green-600"
                    : passwordRequirements.hasNumber ||
                        passwordRequirements.hasLetter ||
                        passwordRequirements.hasSpecialChar
                      ? "text-red-600"
                      : "text-muted-foreground"
                }`}
              >
                <span>
                  {passwordRequirements.hasNumber &&
                  passwordRequirements.hasLetter &&
                  passwordRequirements.hasSpecialChar
                    ? "✔"
                    : passwordRequirements.hasNumber ||
                        passwordRequirements.hasLetter ||
                        passwordRequirements.hasSpecialChar
                      ? "🗴"
                      : "•"}
                </span>{" "}
                Must contain numbers, letters, and special characters
              </p>
              <p
                className={`${
                  passwordRequirements.isValidLength
                    ? "text-green-600"
                    : passwordRequirements.hasNumber ||
                        passwordRequirements.hasLetter ||
                        passwordRequirements.hasSpecialChar
                      ? "text-red-600"
                      : "text-muted-foreground"
                }`}
              >
                <span>
                  {passwordRequirements.isValidLength
                    ? "✔"
                    : passwordRequirements.hasNumber ||
                        passwordRequirements.hasLetter ||
                        passwordRequirements.hasSpecialChar
                      ? "🗴"
                      : "•"}
                </span>{" "}
                Must be 6-20 characters long
              </p>
            </div>
          </div>
          <FormField
            control={form.control}
            name="confirmPassword"
            disabled={loading}
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword1 ? "text" : "password"}
                    placeholder="Confirm the password"
                    {...field}
                  />
                </FormControl>
                <Button
                  onClick={handleShowPassword1}
                  disabled={loading}
                  type="button"
                  className="absolute top-6 right-1 hover:bg-transparent text-muted-foreground"
                  size="icon"
                  variant="ghost"
                >
                  {showPassword1 ? <Eye /> : <EyeClosed />}
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={loading}
          className="mt-5 w-full mb-4 bg-orange-600 hover:bg-orange-600/80"
          type="submit"
        >
          Sign Up
        </Button>
        <span className="text-sm text-muted-foreground">
          By continuing, you agree to the{" "}
          <span className="cursor-pointer font-semibold hover:text-orange-600 text-zinc-700">
            Merchant Terms of Service for 1 Market Philippines
          </span>
          ,{" "}
          <span className="cursor-pointer font-semibold hover:text-orange-600 text-zinc-700">
            Our Commercial Terms of Service
          </span>{" "}
          and acknowledge that you have read the{" "}
          <span className="cursor-pointer font-semibold hover:text-orange-600 text-zinc-700">
            1 Market Philippines Shop Privacy Policy
          </span>{" "}
          to learn how we collect, use and share your data.
        </span>
      </form>
    </Form>
  );
};

export default RegisterForm;
