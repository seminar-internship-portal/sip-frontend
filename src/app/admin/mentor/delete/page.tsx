"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";
import { headers } from "next/headers";

// Function to fetch student data
const fetchMentor = async () => {
  try {
    const adminCookie = getCookie("Admin");
    if (!adminCookie) {
      console.log("Admin cookie not found ");
      return;
    }

    const { accessToken } = JSON.parse(adminCookie);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      credentials: "include",
    };

    const response = await fetch(
      "https://sip-backend-api.onrender.com/api/v1/mentor",
      {
        method: "GET",
        headers: headers,
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    return null;
  }
};

const Page = () => {
  const [registrationId, setRegistrationId] = useState("");
  const [mentorData, setMentorData] = useState<any>(null);
  const [matchMentorData, setMatchMentorData] = useState<any>(null); // Corrected variable name

  const router = useRouter();

  // Fetch student data when the component mounts
  useEffect(() => {
    async function fetchData() {
      const mentorData = await fetchMentor();
      if (mentorData) {
        setMentorData(mentorData.data);
      }
    }

    fetchData();
  }, []);

  // Function to delete mentor
  const deleteMentor = async () => {
    try {
      const adminCookies = getCookie("Admin");
      if (!adminCookies) {
        console.error("Admin cookie not found");
        return;
      }
      console.log(adminCookies);

      const { accessToken } = JSON.parse(adminCookies);

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `https://sip-backend-api.onrender.com/api/v1/admin/deleteMentor/${matchMentorData?.id}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      const updatedMentorData = await fetchMentor();
      if (updatedMentorData) {
        setMentorData(updatedMentorData.data);
      }
      toast.success("Mentor deleted successfully");
    } catch (error) {
      console.error("There was a problem with the request:", error);
      toast.error("Failed to delete mentor");
    }
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const checked = e.target.checked;
    if (checked) {
      const selectedMentor = mentorData.find(
        (mentor: any) => mentor.registrationId === id
      );
      if (selectedMentor) {
        setMatchMentorData(selectedMentor);
        setRegistrationId(selectedMentor.registrationId);
      }
    } else {
      setMatchMentorData(null);
      setRegistrationId(""); // Clear the registrationId when the checkbox is unchecked
    }
  };

  // Function to handle search
  const handleSearch = async () => {
    if (mentorData) {
      const matchingMentor = mentorData.find(
        (student: any) => student.registrationId === registrationId
      );
      if (matchingMentor) {
        setMatchMentorData(matchingMentor);
      } else {
        setMatchMentorData(null);
        toast.error("no data found ");
      }
    }
  };

  useEffect(() => {
    console.log(matchMentorData);
  }, [matchMentorData]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = mentorData
    ? mentorData.filter((item: any) => {
        return Object.values(item).some((value: any) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  return (
    <div>
      {/* Card for deleting mentor */}
      <div className="flex justify-center items-center ">
        <Card
          key="hi"
          className="flex-grow relative w-full max-w-md mx-2 my-5 p-5"
        >
          <div className="relative">
            <div
              className="absolute top-1 right-0 p-2"
              aria-label="Delete"
            ></div>
          </div>
          <div className="flex justify-between items-center">
            <CardHeader>
              <CardTitle>
                Enter the Registration Id no of the Mentor to be deleted
              </CardTitle>
            </CardHeader>
          </div>
          <CardContent className="mt1">
            <label htmlFor="registrationId" className="block mb-2">
              Registration Id
            </label>
            <input
              type="text"
              name="registrationId"
              id="registrationId"
              className="h-10 border rounded px-4 w-full bg-gray-50"
              value={registrationId}
              onChange={(e) => setRegistrationId(e.target.value)}
            />
            <div className="mt-5">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" onClick={handleSearch}>
                    Delete
                  </Button>
                </AlertDialogTrigger>
                {matchMentorData && (
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <div className="text-gray-700">
                          <p className="mb-2">
                            This action cannot be undone. This will permanently
                            delete the Mentor and remove your data from our
                            servers.
                          </p>
                          <div className="mt-5">
                            <div className="font-extrabold text-lg mb-2">
                              Mentor Information:
                            </div>
                            <ul>
                              <li className="mb-1">
                                <span className="font-bold mr-2">
                                  Mentor Name:
                                </span>
                                <span>{matchMentorData?.fullName}</span>{" "}
                              </li>
                              <li className="mb-1">
                                <span className="font-bold mr-2">
                                  Mentor Email:
                                </span>
                                <span>{matchMentorData?.email}</span>{" "}
                                {/* Corrected variable name */}
                              </li>
                              <li className="mb-1">
                                <span className="font-bold mr-2">
                                  Mentor Mobile No:
                                </span>
                                <span>{matchMentorData?.mobileNo}</span>{" "}
                              </li>
                              <li className="mb-1">
                                <span className="font-bold mr-2">
                                  Mentor ID:
                                </span>
                                <span>{matchMentorData?.id}</span>{" "}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={deleteMentor}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                )}
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center items-center">
        <Card className="flex-grow relative w-full max-w-4xl mx-3 my-3 p-5">
          {" "}
          {/* Increased max width to max-w-4xl */}
          <div className="flex justify-between items-center">
            <CardHeader>
              <CardTitle className="text-2xl">
                Search Student To Delete
              </CardTitle>
            </CardHeader>
          </div>
          <div className="p-2">
            <input
              type="text"
              placeholder="Search by name..."
              className="border border-gray-400 rounded px-4 py-2 mb-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && filteredData.length === 0 && (
              <p className="text-red-500">No matching data found</p>
            )}
            {searchTerm && filteredData.length > 0 && (
              <table className="w-full border-collapse border border-gray-400 rounded">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-1 py-2"></th>
                    <th className="border border-gray-400 px-4 py-2">Name</th>
                    <th className="border border-gray-400 px-4 py-2">
                      Mobile No
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Registration ID
                    </th>
                    <th className="border border-gray-400 px-4 py-2">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item: any) => (
                    <tr key={item.id}>
                      <td className="border border-gray-400 px-4 py-2">
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            handleCheckboxChange(e, item.registrationId)
                          }
                        />
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {item.fullName}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {item.mobileNo}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {item.registrationId}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {item.email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>
      </div>

      <Button onClick={() => router.back()}>GO BACK</Button>
    </div>
  );
};

export default Page;
