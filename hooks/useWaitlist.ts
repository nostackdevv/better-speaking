import { useState } from "react";
// import { supabase } from "@/lib/supabase";

type WaitlistStatus = "idle" | "loading" | "success" | "error";

export function useWaitlist() {
  const [status, setStatus] = useState<WaitlistStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const joinWaitlist = async (email: string) => {
    setStatus("loading");
    setErrorMessage("");

    // try {
    //   const trimmedEmail = email.toLowerCase().trim();

    //   const { error } = await supabase
    //     .from("waitlist")
    //     .insert({ email: trimmedEmail, source: "web" });

    //   if (error) {
    //     // Handle duplicate email (user already on waitlist)
    //     if (error.code === "23505") {
    //       setStatus("success"); // Still show success - they're on the list
    //       return { success: true, alreadyRegistered: true };
    //     }

    //     // Handle other errors
    //     throw error;
    //   }

    //   setStatus("success");
    //   return { success: true, alreadyRegistered: false };
    // } catch (err) {
    //   console.error("Waitlist error:", err);
    //   setStatus("error");
    //   setErrorMessage("Something went wrong. Please try again.");
    //   return { success: false, error: err };
    // }
  };

  const reset = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return {
    joinWaitlist,
    status,
    errorMessage,
    reset,
  };
}
