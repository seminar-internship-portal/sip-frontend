// Assuming 'br-2 bg-slate-950 w-584 h-900' are valid Tailwind CSS classes
"use client";
import React from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function Signin() {
  const handleButtonClick = () => {
    toast.success('Account Created Successfully'); // Displays a success message
  };

  return (
    <div className="h-screen w-screen flex">
      <div className="bg-slate-950 w-1/3 h-screen"></div>
      <div className="w-2/3 flex flex-wrap flex-col items-center justify-center">
        <Card className="sm:w-[700px]">
          <form>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>Enter your details below</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="name" placeholder="Enter Your name" required/>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="myemail@gmail.com"
              />
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required/>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              <Button onClick={handleButtonClick}>
                Create Account
              </Button>
            </div>
            <div>
              <Link href="/login"><Button>Log in</Button></Link>
            </div>
          </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
