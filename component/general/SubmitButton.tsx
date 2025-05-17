"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      className="flex items-center gap-2"
      type="submit"
      disabled={pending}
    >
      {pending && <Loader2 className="animate-spin w-4 h-4" />}
      {pending ? "Uploading" : "Submit"}
    </Button>
  );
}
