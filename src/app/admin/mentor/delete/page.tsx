"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.back()}>GO BACK</Button>
    </div>
  );
};

export default page;
