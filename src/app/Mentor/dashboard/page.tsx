"use client";

import { useEffect, useState } from "react";
import { Student, columns } from "./columns";
import { DataTable } from "./data-table";
import { useSelector } from "react-redux";
import { selectMentor } from "@/app/features/username/Slice";
import { getCookie } from "cookies-next";
export default function StudentTable() {
  const [data, setData] = useState<Student[]>([]);
  const [ayear, setAyear] = useState("");
  const mentor = useSelector(selectMentor);
  useEffect(() => {
    async function fetchData() {
      console.log(ayear);
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
        `https://sip-backend-api.onrender.com/api/v1/mentor/studentAssigned/${mentor._id}?academicYear=${ayear}`,
        {
          headers: headers,
          method: "GET",
        }
      ); // Assuming the API route is defined in pages/api/v1/student.ts
      const resData = await response.json();

      if (!resData.success) {
        throw new Error("Failed to fetch data");
      }

      setData(
        resData.data.map((item: any) => ({
          username: item.username,
          email: item.email,
          fullName: item.fullName,
          mobileNo: item.mobileNo,
          rollNo: item.rollNo,
          prnNo: item.prnNo,
          registrationId: item.registrationId,
          id: item._id,
        }))
      );
      console.log(resData);
    }
    fetchData();
  }, [ayear]); // Fetch data whenever ayear changes

  return (
    <div className="container mx-auto py-10 overflow-y-auto">
      <DataTable
        columns={columns}
        data={data}
        ayear={ayear}
        setAyear={setAyear}
      />
    </div>
  );
}
