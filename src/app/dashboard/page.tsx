// page.tsx
import React from "react";
import { Student, columns } from "./columns";
import { DataTable } from "./data-table";
import { StudentInfo } from "@/constants/data";
import axios from "axios";

async function getData(): Promise<Student[]> {
  // Fetch data from your API here.
  const StudentData = await axios.get("http://localhost:8000/api/v1/student");
  console.log(StudentData);
  return StudentInfo;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="overflow-hidden px-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
