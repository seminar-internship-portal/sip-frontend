"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";

interface Response {
  _id: string;
  username: string;
  registrationId: string;
  email: string;
  fullName: string;
  mobileNo: string;
  avatar: string;
  students: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const Profile = () => {
  const [data, setData] = useState<Response | null>(null);

  useEffect(() => {
    // Fetch data when the component mounts
    axios
      .get("http://localhost:8000/api/v1/mentor/65b3a6acf0366cfc883e0b33")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="m-12">
      <Card className="w-full p-6 bg-white rounded-md drop-shadow-md transition-all duration-100 ease-in-out delay-100 hover:drop-shadow-2xl flex flex-row">
        <div className="">
          <CardHeader className="py-12">
            <Image
              className="object-cover rounded-full"
              src="/noavatar.png"
              alt="/public/noavatar.png"
              width={50}
              height={50}
            />
          </CardHeader>
          <CardContent>
            {data && (
              <form className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="font-bold">
                    Name
                  </Label>
                  <h1>{data.fullName}</h1>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username" className="font-bold">
                    Username
                  </Label>
                  <p>{data.username}</p>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email" className="font-bold">
                    Email
                  </Label>
                  <p>{data.email}</p>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="mobileNo" className="font-bold">
                    Mobile Number
                  </Label>
                  <p>{data.mobileNo}</p>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="students" className="font-bold">
                    Students
                  </Label>
                  <ul>
                    {data.students.map((student, index) => (
                      <li key={index}>
                        <p>Student Name: {student.name}</p>
                        <p>Student ID: {student.id}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </form>
            )}
          </CardContent>
        </div>
        <div className="m-12 px-28">
          <ScrollArea className="h-96 w-96 rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-bold leading-none">
                Students Appointed
              </h4>
              {tags.map((tag) => (
                <>
                  <div key={tag} className="text-sm">
                    {tag}
                  </div>
                  <Separator className="my-2" />
                </>
              ))}
            </div>
          </ScrollArea>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
