// Assuming that 'br-2 bg-slate-950 w-584 h-900' are valid Tailwind CSS classes

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

async function Log() {
  const StudentData = await axios.get("http://localhost:8000/api/v1/student");
  console.log(StudentData.data.data);
  return (
    <div className="h-screen w-screen flex">
      <div className="bg-slate-950 w-1/3 h-screen"></div>
      <div className="w-2/3 flex flex-wrap flex-col items-center justify-center">
        <Card className="sm:w-[700px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl my-2">
              Login to your Account
            </CardTitle>
            <div className="flex gap-1 my-2 w-full">
              <ToggleGroup type="single" className="w-full">
                <ToggleGroupItem
                  value="Mentor"
                  className="bg-white text-black w-full"
                >
                  Mentor
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="Student"
                  className="bg-white text-black w-full"
                >
                  Student
                </ToggleGroupItem>

                <ToggleGroupItem
                  value="Admin"
                  className="bg-white text-black w-full"
                >
                  Admin
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <CardDescription>
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
              <Link
                className="text-right text-xs text-slate-500 hover:underline hover:text-slate-300"
                href="/forgotpassword"
              >
                Forgot Password
              </Link>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password </Label>
              <Input id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/dashboard">
              <Button>Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline">Sign up</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Log;
