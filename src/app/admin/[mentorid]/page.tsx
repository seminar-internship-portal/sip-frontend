"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
import toast from "react-hot-toast";
import axios from "axios";
import { error } from "console";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const page = ({ params }: { params: { mentorid: string } }) => {
  const [studentData, setStudentData] = useState<any>(null);
  const [matchStudentData, setMatchStudentData] = useState<any>(null);
  const [mentor, setMentor] = useState<any>({});
  const [assignedStudents, setAssignedStudents] = useState<any>([]);
  const [id, setId] = useState("");
  const [open, isOpen] = useState(false);
  const [ayear, setAyear] = useState("");
  const fetchData = async () => {
    try {
      const adminCookies = getCookie("Admin");
      if (!adminCookies) {
        console.error("Admin cookie not found");
        return;
      }
      console.log(adminCookies);

      const { accessToken } = JSON.parse(adminCookies);

      const mentorId = params.mentorid;
      const baseUrl = process.env.API_BASE_URL;
      const url = `${baseUrl}/mentor/${mentorId}`;
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMentor(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchassstud = async () => {
    try {
      const adminCookies = getCookie("Admin");
      if (!adminCookies) {
        console.error("Admin cookie not found");
        return;
      }
      console.log(adminCookies);

      const { accessToken } = JSON.parse(adminCookies);

      const mentorId = params.mentorid;
      const baseUrl = process.env.API_BASE_URL;
      const assignedStud = `${baseUrl}/mentor/studentAssigned/${mentorId}?academicYear=${ayear}`;
      const assignedStudRes = await axios.get(assignedStud, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(assignedStudRes.data.data);
      setAssignedStudents(assignedStudRes.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchassstud();
  }, []);
  useEffect(() => {
    fetchassstud();
  }, [ayear]);

  useEffect(() => {
    fetchData();
  }, [params.mentorid]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStudent = async () => {
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
        "https://sip-backend-api.onrender.com/api/v1/student",
        {
          headers: headers,
          method: "GET",
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

  const filteredData = studentData
    ? studentData
        .filter((item: any) => {
          return Object.values(item).some((value: any) =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
        .slice(0, 10) // Limit to the top 20 results
    : [];

  useEffect(() => {
    async function fetchDatastud() {
      const studentData = await fetchStudent();
      if (studentData) {
        setStudentData(studentData.data);
      }
    }

    fetchDatastud();
  }, []);

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const checked = e.target.checked;
    if (checked) {
      const selectedStudent = studentData.find(
        (student: any) => student.id === id
      );
      if (selectedStudent) {
        setMatchStudentData(selectedStudent);
        setId(selectedStudent.id);
      } else {
        setMatchStudentData(null);
        setId(""); // Clear the id when the checkbox is unchecked
      }
    }
  };

  const handleAssignment = async (event: any) => {
    event.preventDefault();

    const adminCookie = getCookie("Admin");
    if (!adminCookie) {
      console.log("Admin cookie not found ");
      return;
    }

    const { accessToken } = JSON.parse(adminCookie);

    const url =
      " https://sip-backend-api.onrender.com/api/v1/admin/assignMentor";
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-Type": "application/json",
      },
    };
    const data = {
      mentorId: params.mentorid,
      studentId: id,
    };
    axios
      .post(url, data, config)
      .then((response) => {
        toast.success(response.data.message);
        setMatchStudentData(null);
        setId("");
        isOpen(false);
        fetchassstud();
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          // Server responded with a status code outside of 2xx range
          toast.error(error.response.data.message || "An error occurred"); // Display error message from the server response
          console.log(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          toast.error("No response received from the server");
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error("An unexpected error occurred");
          console.log("Error", error.message);
        }
      });
  };

  const handleDelete = async (event: any, id: string) => {
    event.preventDefault();

    const adminCookie = getCookie("Admin");
    if (!adminCookie) {
      console.log("Admin cookie not found ");
      return;
    }

    const { accessToken } = JSON.parse(adminCookie);

    const url =
      " https://sip-backend-api.onrender.com/api/v1/admin/removeMentor";
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-Type": "application/json",
      },
    };
    const data = {
      studentId: id,
    };
    console.log(data);
    axios
      .post(url, data, config)
      .then((response) => {
        toast.success(response.data.message);
        fetchassstud();
        console.log(response.data);
      })
      .catch((error: any) => {
        if (error.response) {
          // Server responded with a status code outside of 2xx range
          toast.error(error.response.data.message || "An error occurred"); // Display error message from the server response
          console.log(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          toast.error("No response received from the server");
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error("An unexpected error occurred");
          console.log("Error", error.message);
        }
      });
  };

  const router = useRouter();
  return (
    <div>
      <Card className="bg-white rounded-md shadow-md hover:shadow-2xl transition duration-300 ease-in-out">
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 items-center">
          <div className="flex justify-center mb-4 sm:mb-0">
            <CardHeader className="w-48 h-48 rounded-full overflow-hidden">
              <Image
                src={mentor.avatar || "/noavatar.png"}
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
      <div className="flex m-3 gap-2">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{ayear || "YEAR"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>ACEDEMIC YEAR</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={ayear}
                onValueChange={(value) => {
                  setAyear(value);
                }}
              >
                <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2022-2023">
                  2022-2023
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2023-2024">
                  2023-2024
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="">
          <Dialog open={open} onOpenChange={isOpen}>
            <DialogTrigger>
              <Button>Assign Student</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Student </DialogTitle>
                {/* <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription> */}
              </DialogHeader>
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
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-max border-collapse border border-gray-400 rounded">
                      <thead>
                        <tr>
                          <th className="border border-gray-400 px-2 py-2"></th>
                          <th className="border border-gray-400 px-4 py-2">
                            Name
                          </th>
                          <th className="border border-gray-400 px-4 py-2">
                            Roll No
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((item: any) => (
                          <tr key={item.id}>
                            <td className="border border-gray-400 px-4 py-2">
                              <input
                                type="checkbox"
                                onChange={(e) =>
                                  handleCheckboxChange(e, item.id)
                                }
                              />
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                              {item.fullName}
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                              {item.rollNo}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <Button onClick={handleAssignment}>Assign</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="overflow-x-auto mt-1 p-5">
        <table className="w-full min-w-max border-collapse border border-gray-400 rounded">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Mobile No</th>
              <th className="border border-gray-400 px-4 py-2">email</th>
              <th className="border border-gray-400 px-4 py-2">rollNo</th>
              <th className="border border-gray-400 px-4 py-2">Delete</th>
            </tr>
          </thead>
          {assignedStudents.length > 0 ? (
            <tbody>
              {assignedStudents.map((item: any) => (
                <tr key={item._id}>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.fullName}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.mobileNo}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.email}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {item.rollNo}
                  </td>
                  <td className="border border-gray-400 px-4 py-2 flex justify-center items-center">
                    <Button onClick={(event) => handleDelete(event, item.id)}>
                      <MdDelete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td className="border border-gray-400 px-4 py-2" colSpan={5}>
                  No student found
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      <div className="p-5 m-5"></div>
      <Button onClick={() => router.back()}>Goback</Button>
    </div>
  );
};

export default page;
