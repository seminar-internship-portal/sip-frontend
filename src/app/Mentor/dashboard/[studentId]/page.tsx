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
  const [interMarks, setInterMarks] = useState<any[]>([]);
  const [updatedMarks, setUpdatedMarks] = useState<any[]>([]);
  const [totalMarks, setTotalMarks] = useState<number>(0);

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

        // Set total seminar marks in state

        const interMarksUrl = `https://sip-backend-api.onrender.com/api/v1/student/${studentId}/internship/marks`;
        const interMarksRes = await axios.get(interMarksUrl);
        setInterMarks(interMarksRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [params.studentId]);
  const handleSaveChanges = () => {
    // Logic to handle saving changes
    console.log("Saving changes...");
    // You can perform any additional logic here, such as making API calls or updating state
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
                            {mark.studCriteriaMarks} / {mark.criteriaTotalMarks}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Edit</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Marks</DialogTitle>
                          <DialogDescription>
                        
                          </DialogDescription>
                        </DialogHeader>
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
                                defaultValue={mark.studCriteriaMarks}
                                className="col-span-3"
                              />
                            </div>
                          ))}
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              </div>
              <div className="bg-white shadow-md rounded-md p-4">
                <h1 className="text-lg font-semibold mb-2">
                  Internship Details
                </h1>
                <Card>
                  <CardHeader>
                    <CardTitle>Internship Marks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {interMarks.map((mark: any, index: any) => (
                        <div
                          key={index}
                          className="flex justify-between p-3 border border-gray-200 rounded-md"
                        >
                          <p className="font-semibold">{mark.criteriaName}</p>
                          <p>
                            {mark.studCriteriaMarks} / {mark.criteriaTotalMarks}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Edit</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Marks</DialogTitle>
                          <DialogDescription>
                  
                          </DialogDescription>
                        </DialogHeader>
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
                                defaultValue={mark.studCriteriaMarks}
                                className="col-span-3"
                              />
                            </div>
                          ))}
                        </div>
                        <DialogFooter>
                          <Button onClick={handleSaveChanges} type="submit">
                            Save changes
                          </Button>
                        </DialogFooter>
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
// export default async function StudentPage({
//   params,
// }: {
//   params: { studentId: string };
// }) {
//   const studentId = params.studentId;
//   const baseUrl = process.env.API_BASE_URL;
//   const url = `${baseUrl}/student/${studentId}`;
//   const response = await axios.get(url);
//   const student = response.data.data;
//   const smarks_url = ` https://sip-backend-api.onrender.com/api/v1/student/${studentId}/seminar/marks`;
//   const smarks_res = await axios.get(smarks_url);
//   const smarks = smarks_res.data.data;
//   const inter_marks_url = ` https://sip-backend-api.onrender.com/api/v1/student/${studentId}/internship/marks`;
//   const inter_marks_res = await axios.get(inter_marks_url);
//   const Inter_marks = inter_marks_res.data.data;
//   console.log(inter_marks_url);
//   console.log(Inter_marks);
//   // Log the smarks_url
//   const handleSaveChanges = () => {
//     // Logic to handle saving changes
//     console.log("Saving changes...");
//     // You can perform any additional logic here, such as making API calls or updating state
//   };
//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <div className="bg-gray-900 text-white py-6 text-center rounded-lg">
//         <h1 className="text-3xl font-semibold">Student Details</h1>
//         <h2 className="text-lg">Name: {student.fullName}</h2>
//       </div>
//       <div className="flex flex-grow">
//         <div className="w-1/3 bg-white p-4">
//           <div className="bg-white shadow-md rounded-md p-4">
//             <h1 className="text-lg font-semibold mb-2">Personal Information</h1>
//             <p>Email: {student.email}</p>
//             <p>Roll Number: {student.rollNo}</p>
//             <p>Mobile Number: {student.mobileNo}</p>
//             <p>PRN Number: {student.prnNo}</p>
//             <p>Registration Number: {student.registrationId}</p>
//           </div>
//         </div>
//         <div className="w-2/3 bg-white p-4">
//           <div className="flex flex-col h-full justify-between">
//             <div className="mb-4">
//               <div className="bg-white shadow-md rounded-md p-4 mb-4">
//                 <h1 className="text-lg font-semibold mb-2">Seminar Details</h1>
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Seminar Marks</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-2 gap-4">
//                       {smarks.map((mark: any, index: any) => (
//                         <div
//                           key={index}
//                           className="flex justify-between p-3 border border-gray-200 rounded-md"
//                         >
//                           <p className="font-semibold">{mark.criteriaName}</p>
//                           <p>
//                             {mark.studCriteriaMarks} / {mark.criteriaTotalMarks}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                   <CardFooter className="flex justify-end">
//                     <Dialog>
//                       <DialogTrigger asChild>
//                         <Button>Edit</Button>
//                       </DialogTrigger>
//                       <DialogContent className="sm:max-w-[425px]">
//                         <DialogHeader>
//                           <DialogTitle>Edit Marks</DialogTitle>
//                           <DialogDescription>
//                             Make changes to marks here. Click save when you're
//                             done.
//                           </DialogDescription>
//                         </DialogHeader>
//                         <div className="grid gap-3 py-3">
//                           {smarks.map((mark: any, index: any) => (
//                             <div
//                               key={index}
//                               className="grid grid-cols-4 items-center gap-4"
//                             >
//                               <Label
//                                 htmlFor={`criteria-${index}`}
//                                 className="text-right"
//                               >
//                                 {mark.criteriaName}
//                               </Label>
//                               <Input
//                                 id={`criteria-${index}`}
//                                 defaultValue={mark.studCriteriaMarks}
//                                 className="col-span-3"
//                               />
//                             </div>
//                           ))}
//                         </div>

//                         {/* <div className="grid gap-4 py-4">
//                           <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="name" className="text-right">
//                               Name
//                             </Label>
//                             <Input
//                               id="name"
//                               defaultValue="Pedro Duarte"
//                               className="col-span-3"
//                             />
//                           </div>
//                           <div className="grid grid-cols-4 items-center gap-4">
//                             <Label htmlFor="username" className="text-right">
//                               Username
//                             </Label>
//                             <Input
//                               id="username"
//                               defaultValue="@peduarte"
//                               className="col-span-3"
//                             />
//                           </div>
//                         </div> */}
//                         <DialogFooter>
//                           <Button type="submit">Save changes</Button>
//                         </DialogFooter>
//                       </DialogContent>
//                     </Dialog>
//                   </CardFooter>
//                 </Card>
//               </div>
//               <div className="bg-white shadow-md rounded-md p-4">
//                 <h1 className="text-lg font-semibold mb-2">
//                   Internship Details
//                 </h1>
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Internship Marks</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-2 gap-4">
//                       {Inter_marks.map((mark: any, index: any) => (
//                         <div
//                           key={index}
//                           className="flex justify-between p-3 border border-gray-200 rounded-md"
//                         >
//                           <p className="font-semibold">{mark.criteriaName}</p>
//                           <p>
//                             {mark.studCriteriaMarks} / {mark.criteriaTotalMarks}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </CardContent>
//                   <CardFooter className="flex justify-end">
//                     <Dialog>
//                       <DialogTrigger asChild>
//                         <Button>Edit</Button>
//                       </DialogTrigger>
//                       <DialogContent className="sm:max-w-[425px]">
//                         <DialogHeader>
//                           <DialogTitle>Edit Marks</DialogTitle>
//                           <DialogDescription>
//                             Make changes to marks here. Click save when you're
//                             done.
//                           </DialogDescription>
//                         </DialogHeader>
//                         <div className="grid gap-3 py-3">
//                           {Inter_marks.map((mark: any, index: any) => (
//                             <div
//                               key={index}
//                               className="grid grid-cols-4 items-center gap-4"
//                             >
//                               <Label
//                                 htmlFor={`criteria-${index}`}
//                                 className="text-right"
//                               >
//                                 {mark.criteriaName}
//                               </Label>
//                               <Input
//                                 id={`criteria-${index}`}
//                                 defaultValue={mark.studCriteriaMarks}
//                                 className="col-span-3"
//                               />
//                             </div>
//                           ))}
//                         </div>
//                         <DialogFooter>
//                           <Button type="submit">Save changes</Button>
//                         </DialogFooter>
//                       </DialogContent>
//                     </Dialog>
//                   </CardFooter>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
