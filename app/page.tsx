"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import SignUp from "./auth/login/page";
import Login from "./auth/login/page";

export default function Home() {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <Login />
    </>
  );
}
