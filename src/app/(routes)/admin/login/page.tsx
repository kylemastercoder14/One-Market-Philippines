import React from "react";
import LoginForm from "../_components/login-form";

const AdminLogin = () => {
  return (
    <div className="flex min-h-svh w-full items-center bg-[#f5f5f5] justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
};

export default AdminLogin;
