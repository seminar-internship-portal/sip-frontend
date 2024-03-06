"use client";
import { Student, columns } from "./columns";
import { DataTable } from "./data-table";
import { useState, useEffect } from "react";

function getData(): Promise<Student[]> {
  // Fetch data from your API here.
  return Promise.resolve([
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]);
}

export default function DemoPage() {
  const [data, setData] = useState<Student[] | null>(null);

  useEffect(() => {
    getData().then((result) => {
      setData(result);
    });
  }, []);

  return (
    <div className="container mx-auto py-10">
      {data ? <DataTable columns={columns} data={data} /> : <p>Loading...</p>}
    </div>
  );
}
