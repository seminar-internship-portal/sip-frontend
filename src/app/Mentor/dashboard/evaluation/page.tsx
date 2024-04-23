"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getCookie } from "cookies-next";
import { useSelector } from "react-redux";
import { selectMentor } from "@/app/features/username/Slice";
import { Button } from "@/components/ui/button";
type Student = {
  id: string;
  username: string;
  email: string;
  fullName: string;
  mobileNo: string;
  rollNo: string;
  prnNo: string;
  registrationId: string;
};
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const page = () => {
  const [data, setData] = useState<any>([]);
  const [ayear, setAyear] = useState("");
  const [open, setOpen] = useState(false);
  const [interMarks, setInterMarks] = useState<any[]>([]);

  const mentor = useSelector(selectMentor);
  useEffect(() => {
    async function fetchData() {
      const mentorCookie = getCookie("Mentor");
      if (!mentorCookie) {
        console.error("Mentor cookie not found");
        return;
      }
      console.log(mentorCookie);

      const { accessToken, _id } = JSON.parse(mentorCookie);
      console.log(accessToken);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        credentials: "include",
      };
      console.log(headers);
      console.log(ayear);
      const response = await fetch(
        // `https://sip-backend-api.onrender.com/api/v1/mentor/studentAssigned/${mentor._id}?academicYear=${ayear}`,
        `https://sip-backend-api.onrender.com/api/v1/mentor/getStudentInfoWithMarks/${mentor._id}`,

        {
          headers: headers,
          method: "GET",
        }
      ); // Assuming the API route is defined in pages/api/v1/student.ts
      const resData = await response.json();

      if (!resData.success) {
        throw new Error("Failed to fetch data");
      }

      setData(resData.data);
    }

    fetchData();
  }, [ayear]);

  const handleSaveChanges = () => {};
  return (
    <div>
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
      <div className="p-5 m-5">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-2xl">
            <Table className="border-1 border-black">
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[400px] text-xl">Full Name</TableHead>
                  <TableHead className="text-xl">Roll No</TableHead>
                  <TableHead className="text-xl text-right">
                    Edit marks
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((data: any) => (
                  <TableRow key={data.id}>
                    <TableCell className=" font-semibold text-lg">
                      {data.studentName}
                    </TableCell>{" "}
                    <TableCell className="text-xl">
                      {data.studentroll}
                    </TableCell>{" "}
                    <TableCell className="text-right">
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button>Edit</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Marks</DialogTitle>
                            <DialogDescription>
                              Make changes to marks here. Click save when you're
                              done.
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleSaveChanges}>
                            <div className="grid gap-3 py-3">
                              {interMarks.map((mark: any, index: any) => (
                                <div
                                  key={index}
                                  className="grid grid-cols-4 items-center gap-4"
                                >
                                  <Label
                                    htmlFor={`criteria-${index}`}
                                    className="text-right"
                                  >
                                    {mark.criteriaName}
                                  </Label>
                                  <Input
                                    id={`criteria-${index}`}
                                    // defaultValue={updatedMarks[index]?.marks}
                                    className="col-span-3"
                                    // onChange={(event) =>
                                    //   handleMarkChange(
                                    //     index,
                                    //     event.target.value
                                    //   )
                                    // }
                                  />
                                </div>
                              ))}
                            </div>
                            <DialogFooter>
                              <Button type="submit">Save changes</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
