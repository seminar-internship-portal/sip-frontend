// Profile.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Table from "../table/page";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMentor,
  setMentor,
  updateProfile,
} from "../../../app/features/username/Slice";
import { getCookie } from "cookies-next";
import { DataTable } from "./data-table";
import { Payment, columns } from "./columns";

interface ProfileData {
  name: string;
  username: string;
  email: string;
  mobileNo: string;
}

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const mentor = useSelector(selectMentor);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  useEffect(() => {
    if (mentor) {
      setName(mentor.fullName);
      setUsername(mentor.username);
      setNumber(mentor.mobileNo);
    }
  }, [mentor]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };
  const handleOpassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value);
  };
  const handleNpassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const submitProfileHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const updatedData = {
      ...mentor,
      username: username,
      fullName: name,
      mobileNo: number,

      // email: "mentor_test@example.com",
      // mobileNo: "1234567890",
      // avatar: "https://example.com/avatar.jpg",
    };

    try {
      const mentorCookie = getCookie("Mentor");
      if (!mentorCookie) {
        console.error("Mentor cookie not found");
        return;
      }
      console.log(mentorCookie);

      const { accessToken } = JSON.parse(mentorCookie);
      console.log(accessToken);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        credentials: "include",
      };

      const response = await fetch(
        "https://sip-backend-api.onrender.com/api/v1/mentor/updateAccountDetails",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        console.log("Profile updated successfully");
        // Dispatch action to update profile in Redux store
        dispatch(setMentor(updatedData)); // Dispatch here
      } else {
        console.error("Error updating profile:", response.statusText);
        // Handle error
      }
    } catch (error) {
      console.error("Error occurred while updating profile:", error);
      // Handle error
    }
  };

  const submitPassHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatepass = {
      newPassword: newPassword,
      oldPassword: oldPassword,
    };
    try {
      const mentorCookie = getCookie("Mentor");
      if (!mentorCookie) {
        console.error("Mentor cookie not found");
        return;
      }

      const { accessToken } = JSON.parse(mentorCookie);
      console.log(accessToken);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        "https://sip-backend-api.onrender.com/api/v1/mentor/changePassword",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(updatepass),
        }
      );
      if (response.ok) {
        console.log("Password updated successfully");
        // Optionally, you can clear the password fields after a successful update
        setNewPassword("");
        setOldPassword("");
      } else {
        console.error("Error updating password:", response.statusText);
        // Handle error
      }
    } catch (error) {
      console.error("Error occurred while updating password:", error);
      // Handle error
    }
  };

  async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      // ...
    ];
  }

  return (
    <div className="m-12">
      <Card className="bg-white rounded-md shadow-md hover:shadow-2xl transition duration-300 ease-in-out">
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 items-center">
          <div className="flex justify-center mb-4 sm:mb-0">
            <CardHeader className="w-32 h-32 rounded-full overflow-hidden">
              <Image
                src="/noavatar.png"
                alt="No Avatar"
                width={128}
                height={128}
                layout="responsive"
              />
            </CardHeader>
          </div>
          <div className="space-y-4 text-center sm:text-left">
            {mentor && (
              <form className="space-y-3">
                <div className="flex flex-col items-center sm:items-start">
                  <Label htmlFor="name" className="font-bold">
                    Name
                  </Label>
                  <p>{mentor.fullName}</p>
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <Label htmlFor="username" className="font-bold">
                    Username
                  </Label>
                  <p>{mentor.username}</p>
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <Label htmlFor="email" className="font-bold">
                    Email
                  </Label>
                  <p>{mentor.email}</p>
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <Label htmlFor="mobileNo" className="font-bold">
                    Mobile Number
                  </Label>
                  <p>{mentor.mobileNo}</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </Card>
      <div className="container mx-auto py-8 bg-white rounded-md shadow-md hover:shadow-2xl transition duration-300 ease-in-out">
        <Table />
      </div>
    </div>
  );
};

export default Profile;
