"use client";
import Barchart from "@/components/Barchart";
import Piechart from "@/components/Piechart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function StudentTable() {
  const [students, setStudents] = useState([]);
  const [dataLength, setDataLength] = useState("");
  const [dataLength23, setDataLength23] = useState("");
  const [dataLength24, setDataLength24] = useState("");
  const [tinternship, setTinternship] = useState([]);
  const [allstudentsWithCompany, setAllstudentsWithCompany] = useState(0);
  const [studentsWithCompany23_24, setStudentsWithCompany23_24] = useState(0);
  const [studentsWithCompany22_23, setStudentsWithCompany22_23] = useState(0);

  const [ayear, setAyear] = useState("");
  const baseUrl = process.env.API_BASE_URL;
  const url = `${baseUrl}/student/internship`;
  const cookie: any =
    getCookie("Student") || getCookie("Admin") || getCookie("Mentor");

  if (!cookie) {
    console.log("No cookie found!");
    return;
  }

  const { accessToken } = JSON.parse(cookie);

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchData = async () => {
    const res = await axios.get(url, config);
    const dataArr = res.data.data;
    const uniqueNames2023 = new Set();

    // Count the total number of students with a unique name and companyName
    const allstudentsWithCompanyCount = dataArr.filter(
      (student: any) =>
        student.companyName !== null && student.companyName !== undefined
    ).length;
    const studentsWithCompany23_24Count = dataArr.filter(
      (student: any) =>
        student.companyName !== null &&
        student.companyName !== undefined &&
        student.academicYear === "2023-2024"
    ).length;
    const studentsWithCompany22_23Count = dataArr.filter(
      (student: any) =>
        student.companyName !== null &&
        student.companyName !== undefined &&
        student.academicYear === "2022-2023"
    ).length;
    setAllstudentsWithCompany(allstudentsWithCompanyCount);
    setStudentsWithCompany22_23(studentsWithCompany22_23Count);
    setStudentsWithCompany23_24(studentsWithCompany23_24Count);
    setStudents(dataArr.slice(0, 10));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const mentorCookie = getCookie("Mentor");
      if (!mentorCookie) {
        console.error("Mentor cookie not found");
        return;
      }

      const { accessToken, mentor } = JSON.parse(mentorCookie);
      const id = mentor._id;
      console.log(id);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        credentials: "include",
      };

      const responseall = await fetch(
        `https://sip-backend-api.onrender.com/api/v1/mentor/studentAssigned/${id}?academicYear=${ayear}`,
        {
          headers: headers,
          method: "GET",
        }
      );
      const response23 = await fetch(
        `https://sip-backend-api.onrender.com/api/v1/mentor/studentAssigned/${id}?academicYear=2022-2023`,
        {
          headers: headers,
          method: "GET",
        }
      );
      const response24 = await fetch(
        `https://sip-backend-api.onrender.com/api/v1/mentor/studentAssigned/${id}?academicYear=2023-2024`,
        {
          headers: headers,
          method: "GET",
        }
      );
      const resData = await responseall.json();
      const resData23 = await response23.json();
      const resData24 = await response24.json();

      if (!resData.success) {
        throw new Error("Failed to fetch data");
      }
      console.log(resData.data);
      // Store the length of the data array
      setDataLength(resData.data.length);
      setDataLength23(resData23.data.length);
      setDataLength24(resData24.data.length);
    }

    fetchData();
  }, [ayear]);

  return (
    <div>
      <div className="container mx-auto py-3 m-5 grid grid-cols-1 sm:grid-cols-2 gap-7">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Total Number of Students under my mentorship:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <p className="font-bold">Total Students:</p>
                  <p>{dataLength}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Total Students (2022-2023):</p>
                  <p>{dataLength23}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Total Students (2023-2024):</p>
                  <p>{dataLength24}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Total Number of Students With internship:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <p className="font-bold">Total Students:</p>
                  <p>{allstudentsWithCompany}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Total Students (2022-2023):</p>
                  <p>{studentsWithCompany22_23}</p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Total Students (2023-2024):</p>
                  <p>{studentsWithCompany23_24}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container mx-auto py-3 flex flex-col gap-10">
        <div>
          <h1 className="font-bold text-xl mb-4">Top Internship Achievers</h1>
          <ScrollArea className="h-96 rounded-md ">
            <div className="p-4">
              <div className="bg-slate-100 rounded-t-md p-4 sticky top-0 z-10">
                <div className="flex justify-between">
                  <div className="w-1/3 font-bold">Full Name</div>
                  <div className="w-1/3 font-bold">Company Name</div>
                  <div className="font-bold">Stipend</div>
                </div>
              </div>
              {students.map((stud: any) => (
                <div
                  key={stud._id}
                  className="bg-white shadow-md rounded-md overflow-hidden my-2"
                >
                  <div className="p-4">
                    <div className="flex justify-between">
                      <div className="w-1/3">{stud.fullName}</div>
                      <div className="w-1/3">{stud.companyName}</div>
                      <div>{`Rs. ${stud.stipend}`}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="m-auto h-4/5 w-4/5">
          <Barchart />
        </div>
        <div>
          <Piechart ay="2023-2024" />
        </div>
        <div>
          <Piechart ay="2022-2023" />
        </div>
      </div>
    </div>
  );
}
