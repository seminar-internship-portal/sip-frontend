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

// Function to fetch student data
const fetchStudent = async () => {
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
      "https://sip-backend-api.onrender.com/api/v1/student",
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
  const [rollNo, setRollNo] = useState("");
  const [studentData, setStudentData] = useState<any>(null);
  const [matchStudentData, setMatchStudentData] = useState<any>(null); // Corrected variable name

  const router = useRouter();

  // Fetch student data when the component mounts
  useEffect(() => {
    async function fetchData() {
      const studentData = await fetchStudent();
      if (studentData) {
        setStudentData(studentData.data);
      }
    }

    fetchData();
  }, []);

  // Function to delete student
  const deleteStudent = async () => {
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
        `https://sip-backend-api.onrender.com/api/v1/admin/deleteStudent/${matchStudentData?.id}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const updatatedStudentData = await fetchStudent();
      if (updatatedStudentData) {
        setStudentData(updatatedStudentData.data);
      }
      const data = await response.json();
      console.log(data);
      toast.success("Student deleted successfully");
    } catch (error) {
      console.error("There was a problem with the request:", error);
      toast.error("Failed to delete student");
    }
  };

  // Function to handle search
  const handleSearch = async () => {
    if (studentData) {
      const matchingStudent = studentData.find(
        (student: any) => student.rollNo === rollNo
      );
      if (matchingStudent) {
        setMatchStudentData(matchingStudent);
      } else {
        setMatchStudentData(null);
        toast.error("no data found ");
      }
    }
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const checked = e.target.checked;
    if (checked) {
      const selectedMentor = studentData.find(
        (student: any) => student.registrationId === id
      );
      if (selectedMentor) {
        setMatchStudentData(selectedMentor);
        setRollNo(selectedMentor.rollNo);
      }
    } else {
      setMatchStudentData(null);
      setRollNo("");
    }
  };

  useEffect(() => {
    console.log(matchStudentData);
  }, [matchStudentData]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = studentData
    ? studentData.filter((item: any) => {
        return Object.values(item).some((value: any) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  return (
    <div>
      {/* Card for deleting student */}
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
                Enter the Roll no of the Student to be deleted
              </CardTitle>
            </CardHeader>
          </div>
          <CardContent className="mt-5">
            <label htmlFor="rollno" className="block mb-2">
              Roll Number
            </label>
            <input
              type="text"
              name="rollno"
              id="rollno"
              className="h-10 border rounded px-4 w-full bg-gray-50"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
            />
            <div className="mt-5">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" onClick={handleSearch}>
                    Delete
                  </Button>
                </AlertDialogTrigger>
                {matchStudentData && (
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <div className="text-gray-700">
                          <p className="mb-2">
                            This action cannot be undone. This will permanently
                            delete the Student and remove your data from our
                            servers.
                          </p>
                          <div className="mt-5">
                            <div className="font-extrabold text-lg mb-2">
                              Student Information:
                            </div>
                            <ul>
                              <li className="mb-1">
                                <span className="font-bold mr-2">
                                  Student Name:
                                </span>
                                <span>{matchStudentData?.fullName}</span>{" "}
                                {/* Corrected variable name */}
                              </li>
                              <li className="mb-1">
                                <span className="font-bold mr-2">
                                  Student Email:
                                </span>
                                <span>{matchStudentData?.email}</span>{" "}
                                {/* Corrected variable name */}
                              </li>
                              <li className="mb-1">
                                <span className="font-bold mr-2">
                                  Student Mobile No:
                                </span>
                                <span>{matchStudentData?.mobileNo}</span>{" "}
                                {/* Corrected variable name */}
                              </li>
                              <li className="mb-1">
                                <span className="font-bold mr-2">
                                  Student ID:
                                </span>
                                <span>{matchStudentData?.id}</span>{" "}
                                {/* Corrected variable name */}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={deleteStudent}>
                        {" "}
                        {/* Corrected function name */}
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
        <Card className="flex-grow relative w-full max-w-2xl mx-2 my-3 p-5">
          <div className="flex justify-between items-center">
            <CardHeader>
              <CardTitle>Search student</CardTitle>
            </CardHeader>
          </div>
          <div className="p-2 ">
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
                      mobileNo
                    </th>
                    <th className="border border-gray-400 px-4 py-2">rollNo</th>
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
                        {item.mobileNo} {/* Corrected property name */}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {item.rollNo}
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
