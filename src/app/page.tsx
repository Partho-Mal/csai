"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-muted/50 p-8 shadow-lg">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome to CyberShield</h1>
          <p className="text-sm text-muted-foreground">
            Your AI-powered fraud detection system.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Button onClick={() => router.push("/login")} className="w-full">
            Login
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push("/signup")}
            className="w-full"
          >
            Signup
          </Button>
        </div>
      </div>
    </div>
  );
}
