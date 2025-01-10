"use server";

import db from "@/lib/db";
import nodemailer from "nodemailer";
import { OtpVerificationHTML } from "@/components/email-template/otp-verification";

export const sendOtpCode = async (email: string) => {
  const otpCode = Math.floor(100000 + Math.random() * 900000);

  try {
    const existingSeller = await db.seller.findFirst({
      where: {
        email,
      },
    });

    if (existingSeller) {
      await db.seller.update({
        where: {
          id: existingSeller.id,
        },
        data: {
          otpCode: otpCode.toString(),
        },
      });
    } else {
      await db.seller.create({
        data: {
          email,
          otpCode: otpCode.toString(),
        },
      });
    }

    await sendOtpCodeEmail(otpCode.toString(), email);

    return { success: "OTP code sent successfully" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred. Please try again later." };
  }
};

export const sendOtpCodeEmail = async (otpCode: string, email: string) => {
  const htmlContent = await OtpVerificationHTML({
    otpCode,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kylemastercoder14@gmail.com",
      pass: "hcmuuhncmnlgzeje",
    },
  });

  const message = {
    from: "kylemastercoder14@gmail.com",
    to: email,
    subject: "Verify your email address",
    text: `Your OTP code is ${otpCode}`,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(message);

    return { success: "Email has been sent." };
  } catch (error) {
    console.error("Error sending notification", error);
    return { message: "An error occurred. Please try again." };
  }
};

export const createSeller = async (data: {
  email: string;
  emailVerificationCode: string;
  password: string;
  confirmPassword: string;
}) => {
  if (
    !data.email ||
    !data.emailVerificationCode ||
    !data.password ||
    !data.confirmPassword
  ) {
    return { error: "Please fill in all required fields" };
  }

  if (data.password !== data.confirmPassword) {
    return { error: "Passwords do not match" };
  }

  try {
    const existingSeller = await db.seller.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!existingSeller) {
      return { error: "Invalid email address" };
    }

    if (existingSeller?.otpCode !== data.emailVerificationCode) {
      return { error: "Invalid OTP code" };
    }

    await db.seller.update({
      where: {
        id: existingSeller.id,
      },
      data: {
        password: data.password,
      },
    });

    return { success: "Account created successfully", seller: existingSeller };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred. Please try again later." };
  }
};
