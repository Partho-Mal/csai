"use client";
import { LoginForm } from "@/components/login-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    // Assume login is successful
    localStorage.setItem("token", "user_token"); 
    router.push("/dashboard"); // Redirect to dashboard
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
         <div className="w-full max-w-sm">
            {/* <h1>Login</h1>
            <button onClick={handleLogin}>Login</button> */}
            <LoginForm />
         </div>
    </div>
  );
}
