"use client";
import Barchart from "@/components/Barchart";
import Piechart from "@/components/Piechart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

export default function StudentTable() {
  const [students, setStudents] = useState([]);
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
    setStudents(dataArr.slice(0, 10));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-3 flex flex-col gap-10">
      <div>
        <h1 className="font-bold m-2">Top Internship securers</h1>
        <ScrollArea className="h-48 rounded-md border">
          <div className="p-4">
            {students.map((stud: any) => (
              <>
                <div key={stud._id} className="text-sm">
                  <div className="flex justify-between">
                    <div className="w-1/3">{stud.fullName}</div>
                    <div className="w-1/3">{stud.companyName}</div>
                    <div>{`Rs. ${stud.stipend}`}</div>
                  </div>
                </div>
                <Separator className="my-2" />
              </>
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
  );
}
