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

const Profile = () => {
  const [data, setData] = useState<Response | null>(null);
  const [studentnumber, setStudentnumber] = useState([]);

  useEffect(() => {
    // Fetch mentor data when the component mounts
    axios
      .get("http://localhost:8000/api/v1/mentor/65b3a6acf0366cfc883e0b33")
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching mentor data:", error);
      });

    // Fetch student data when the component mounts
    axios
      .get("https://sip-backend-api.onrender.com/api/v1/student")
      .then((res) => {
        setStudentnumber(res.data.data || []); // Assuming data is the array of students
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  // console.log(studentnumber.length);

  return (
    <div className="m-12">
      <Card className="w-full p-6 bg-white rounded-md drop-shadow-md transition-all duration-100 ease-in-out delay-100 hover:drop-shadow-2xl flex flex-row gap-28">
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
              </form>
            )}
          </CardContent>
        </div>
        <div className="w-1/2 flex justify-center content-center gap-10 flex-col items-center">
          <h1 className="font-bold text-2xl"> Students Appointed</h1>
          <div className="font-bold text-2xl">{studentnumber.length}</div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
