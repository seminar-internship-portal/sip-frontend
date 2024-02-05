"use client";

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
import { NextRouter, useRouter } from "next/router";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Student = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  mobileNo: string;
  rollNo: string;
  prnNo: string;
  registrationId: string;
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
    accessorKey: "rollNo",
    header: ({ column }) => {
      return (
        <Button
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Roll No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  // {
  //   accessorKey: "id",
  //   header: "Id",
  // },

  {
    header: "Profile",
    cell: ({ row }) => {
      const studentId = row.original.id;

      const handleProfileClick = () => {
        // Pass the studentId to the profile page
        goToProfile(studentId);
      };

      return (
        <div>
          <Button onClick={handleProfileClick}>Profile</Button>
        </div>
      );
    },
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

const goToProfile = (studentId: string) => {
  // Use window.location.href to navigate without the router hook
  window.location.href = `/mentor/dashboard/${studentId}`;
};
