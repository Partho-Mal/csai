"use client";
import { SignupForm } from "@/components/signup-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = async () => {
    // Assume signup is successful
    localStorage.setItem("token", "user_token"); 
    router.push("/dashboard"); // Redirect to dashboard
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}
