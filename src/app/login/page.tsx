// Assuming that 'br-2 bg-slate-950 w-584 h-900' are valid Tailwind CSS classes
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

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

import { useDispatch } from "react-redux";
import { setMentor } from "../features/username/Slice";
import { setStudent } from "../features/studentname/slice";
export default function Log() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(
    typeof localStorage !== "undefined"
      ? localStorage.getItem("role") || "Student"
      : "Student"
  );

  const Baseurl = process.env.API_BASE_URL;

  useEffect(() => {
    // Check if user is already logged in using stored session data in cookies
    const storedUser = getCookie("Student") || getCookie("Mentor");
    console.log(storedUser);
    if (storedUser && role === "Student") {
      toast.success("already logged in");
      router.push("/Student/dashboard");
    } else if (storedUser && role === "Mentor") {
      toast.success("already logged in");
      router.push("/Mentor/dashboard");
    }
  }, [router]);

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("role", role);
  }, [role]);

  const dispatch = useDispatch();
  const onlogin = async () => {
    const apiUrl = `${Baseurl}/${role}/login`;
    const data = {
      email,
      password,
    };
    // console.log(data);
    try {
      const response = await axios.post(apiUrl, data);
      console.log("login success", response.data);
      // Store user information in cookies
      // setCookie("user", JSON.stringify(response.data), { path: "/" });
      if (role === "Student") {
        setCookie("Student", response.data);
        setUser(response.data);
        console.log(response.data.data?.student);
        dispatch(setStudent(response.data.data?.student));
        toast.success(response.data.message);
        router.push("/Student/dashboard");
      }

      if (role === "Mentor") {
        setCookie("Mentor", response.data);
        console.log(response.data);
        setUser(response.data);
        dispatch(setMentor(response.data.data?.mentor));
        toast.success(response.data.message);
        router.push("/Mentor/dashboard");
      }
    } catch (error: any) {
      console.log("login failed", error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex w-screen min-h-screen">
      <div className="hidden bg-slate-950 lg:w-1/3 lg:min-h-screen lg:flex"></div>
      <div className="flex flex-col items-center justify-center w-full p-4 lg:w-2/3">
        <Card className="w-full my-auto lg:w-2/3">
          <CardHeader className="space-y-1">
            <CardTitle className="my-2 text-2xl">
              Login to your Account
            </CardTitle>
            <div className="flex w-full gap-1 my-2">
              <ToggleGroup
                type="single"
                onValueChange={(value) => setRole(value)}
                defaultValue="Student"
                className="w-full py-2"
              >
                <ToggleGroupItem
                  value="Mentor"
                  className="w-full text-black bg-white border-2"
                >
                  Mentor
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="Student"
                  className="w-full text-black bg-white border-2"
                >
                  Student
                </ToggleGroupItem>

                <ToggleGroupItem
                  value="Admin"
                  className="w-full text-black bg-white border-2"
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
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
              />
              <Link
                className="text-xs text-right text-slate-500 hover:underline hover:text-slate-300"
                href="/forgotpassword"
              >
                Forgot Password
              </Link>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between w-full">
            <Button onClick={onlogin} className="w-full">
              Login
            </Button>
            {/* </Link> */}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
