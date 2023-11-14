import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-secondary">
      <div className="py-4 px-6">
        <Button asChild variant={"link"} className="text-lg font-bold">
          <Link href={"/"}>Home</Link>
        </Button>
      </div>
    </header>
  );
}
