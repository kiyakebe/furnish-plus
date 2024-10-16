import { NextUIProvider } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <NextUIProvider>
      <h1>This is the e-commerce</h1>
      <Link href={"/api/auth/signin"} > Get Started </Link>
    </NextUIProvider>
  );
}
