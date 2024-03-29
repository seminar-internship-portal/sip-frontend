"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const StudentPage = ({ params }: { params: { studentId: string } }) => {
  const [student, setStudent] = useState<any>({});
  const [smarks, setSmarks] = useState<any[]>([]);
  const [updatedMarks, setUpdatedMarks] = useState<
    { evaluationCriteria: string; marks: string }[]
  >([]);

  const [totalMarks, setTotalMarks] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [totalcriteria, setTotalCriteria] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentId = params.studentId;
        const baseUrl = process.env.API_BASE_URL;
        const url = `${baseUrl}/student/${studentId}`;
        const response = await axios.get(url);
        setStudent(response.data.data);
        console.log(response.data.data);

        const smarksUrl = `https://sip-backend-api.onrender.com/api/v1/student/${studentId}/seminar/marks`;
        const smarksRes = await axios.get(smarksUrl);
        setSmarks(smarksRes.data.data);

        const seminarTotalMarks = smarksRes.data.data.reduce(
          (total: any, mark: any) => total + mark.studCriteriaMarks,
          0
        );
        const totalcriteriamarks = smarksRes.data.data.reduce(
          (totalcriteriamarks: any, mark: any) =>
            totalcriteriamarks + mark.criteriaTotalMarks,
          0
        );
        setTotalCriteria(totalcriteriamarks);
        // Set total seminar marks in state
        setTotalMarks(seminarTotalMarks);
        const initialUpdatedMarks = smarksRes.data.data.map((mark: any) => ({
          evaluationCriteria: mark.criteriaId,
          marks: mark.studCriteriaMarks,
        }));
        setUpdatedMarks(initialUpdatedMarks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [params.studentId]);
  const handleMarkChange = (index: number, newMarks: string) => {
    const updated = [...updatedMarks];
    updated[index] = {
      ...updated[index],
      marks: newMarks,
    };
    setUpdatedMarks(updated);
  };

  const handleSaveChanges = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const studentId = params.studentId;
      const baseUrl = process.env.API_BASE_URL;
      const evaluateUrl = `${baseUrl}/mentor/seminar/evaluate/${studentId}`;

      // Send POST request with updated marks
      const response = await axios.post(evaluateUrl, updatedMarks);
      console.log(updatedMarks);
      // location.reload();
      const total = updatedMarks.reduce(
        (total: any, mark: any) => total + parseInt(mark.marks),
        0
      );

      setTotalMarks(total);
      toast.success(response.data.message);
      console.log("Changes saved successfully!");
      setOpen(false);
    } catch (error: any) {
      toast.error("Error saving changes:", error.response.data);
    }
  };
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-gray-900 text-white py-6 text-center rounded-lg">
        <h1 className="text-3xl font-semibold">Student Details</h1>
        <h2 className="text-lg">Name: {student.fullName}</h2>
      </div>
      <div className="flex flex-grow">
        <div className="w-1/3 bg-white p-4">
          <div className="bg-white shadow-md rounded-md p-4">
            <h1 className="text-lg font-semibold mb-2">Personal Information</h1>
            <p>Email: {student.email}</p>
            <p>Roll Number: {student.rollNo}</p>
            <p>Mobile Number: {student.mobileNo}</p>
            <p>PRN Number: {student.prnNo}</p>
            <p>Registration Number: {student.registrationId}</p>
          </div>
        </div>
        <div className="w-2/3 bg-white p-4">
          <div className="flex flex-col h-full justify-between">
            <div className="mb-4">
              <div className="bg-white shadow-md rounded-md p-4 mb-4">
                <h1 className="text-lg font-semibold mb-2">Seminar Details</h1>
                <Card>
                  <CardHeader>
                    <CardTitle>Seminar Marks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {smarks.map((mark: any, index: any) => (
                        <div
                          key={index}
                          className="flex justify-between p-3 border border-gray-200 rounded-md"
                        >
                          <p className="font-semibold">{mark.criteriaName}</p>
                          <p>
                            {updatedMarks[index]?.marks} /{" "}
                            {mark.criteriaTotalMarks}
                          </p>
                        </div>
                      ))}
                      <div className="flex justify-between p-3 border border-gray-200 rounded-md">
                        <p className="font-semibold">Total Marks</p>
                        <p>
                          {totalMarks} / {totalcriteria}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
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
                            {smarks.map((mark: any, index: any) => (
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
                                  defaultValue={updatedMarks[index]?.marks}
                                  className="col-span-3"
                                  onChange={(event) =>
                                    handleMarkChange(index, event.target.value)
                                  }
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
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentPage;
