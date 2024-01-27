"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
export type Student = {
  id: string;
  rollno: number;
  name: string;
  email: string;
  prn: number;
};

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/student")
      .then((response) => response.json())
      .then((data) => setStudents(data.data));
  }, []);

  return (
    <div>
      {students.map((item) => (
        <div key={item.id}>
          <p>Username: {item.name}</p>
          <p>Email: {item.email}</p>
          <p>Roll No: {item.rollno}</p>
          <p>PRN: {item.prn}</p>
          {/* Add more properties as needed */}
        </div>
      ))}
    </div>
  );
};

export const columns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={() => table.toggleAllPageRowsSelected()}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={() => row.toggleSelected()}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "rollno",
    header: "Roll No",
  },
  {
    accessorKey: "prn",
    header: "PRN",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const Student = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(Student.id)}
            >
              Copy Student ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
