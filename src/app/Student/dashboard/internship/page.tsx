"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/custom/image-upload";
import { getCookie } from "cookies-next";
import { selectStudent } from "@/app/features/studentname/slice";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Link, MoveRight } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";

const internship = () => {
  const [companyName, setCompanyName] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("");
  const [internshipdata, setInternshipData] = useState([]);
  const student = useSelector(selectStudent);

  // completetion Letter
  const [selectedFileCL, setSelectedFileCL] = useState<Array<File | null>>([]);
  const [selectedfileCLT, setSelectedFileCLT] = useState<any>(null);

  const [selectedFilePL, setSelectedFilePL] = useState<Array<File | null>>([]);
  const [selectedfilePLT, setSelectedFilePLT] = useState<any>(null);

  //Offer Letter
  const [selectedFileOL, setSelectedFileOL] = useState<Array<File | null>>([]);
  const [selectedFileOLT, setselectedfileOLT] = useState<any>(null);

  const [open, setisOpen] = useState(false);

  const handleNameChange = (event: any) => {
    setCompanyName(event.target.value);
  };

  const handleDurationChange = (event: any) => {
    setDuration(event.target.value);
  };

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
  };

  const submitInternshipHandler = (event: any) => {
    event.preventDefault();
    // Here you can submit the form data or perform any other actions
    // console.log("Form submitted:", {
    //   companyName,
    //   duration,
    //   status,
    // });
    const data = {
      companyName: companyName,
      duration: duration,
      status: status,
      id: student._id,
    };
    try {
      const studentCookie = getCookie("Student");
      if (!studentCookie) {
        console.error("Student cookie not found");
        return;
      }
      const { student, accessToken } = JSON.parse(studentCookie);
      if (!student || !student._id) {
        console.error("Student ID not found in cookie");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const url = `https://sip-backend-api.onrender.com/api/v1/student/addinternshipDetails`;
      axios
        .post(url, data, config)
        .then((response) => {
          setInternshipData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching Internship Data:", error);
        });
    } catch (error) {}
  };

  const fetchInternshipData = () => {
    const studentCookie = getCookie("Student");
    if (!studentCookie) {
      console.error("Student cookie not found");
      return;
    }
    const { student, accessToken } = JSON.parse(studentCookie);
    if (!student || !student._id) {
      console.error("Student ID not found in cookie");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const url = `https://sip-backend-api.onrender.com/api/v1/student/${student._id}/internship `;
    axios
      .get(url, config)
      .then((response) => {
        setInternshipData(response.data.data);
        setisOpen(false);
      })
      .catch((error) => {
        console.error("Error fetching Internship Data:", error);
      });
  };

  useEffect(() => {
    fetchInternshipData();
  }, []);

  //Permission Letter
  const handleCompeletionOL = (
    event: React.FormEvent<HTMLFormElement>,
    index: number
  ) => {
    event.preventDefault();
    const file = selectedFileOL[index];
    console.log(file);
    // Proceed with uploading the file
  };

  const handleCompeletionPL = (
    event: React.FormEvent<HTMLFormElement>,
    index: number
  ) => {
    event.preventDefault();
    const file = selectedFilePL[index];
    console.log(file);

    // Proceed with uploading the file
  };

  const handleCompeletionCL = (
    event: React.FormEvent<HTMLFormElement>,
    index: number
  ) => {
    event.preventDefault();
    const file = selectedFileCL[index];
    console.log(file);

    // Proceed with uploading the file
  };

  const openPdfInNewTab = (file: File) => {
    const pdfUrl = URL.createObjectURL(file);
    window.open(pdfUrl, "_blank");
  };

  const handleFileChangeOL = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const updatedFiles = [...selectedFileOL];
      updatedFiles[index] = files[0];
      setSelectedFileOL(updatedFiles);
    }
  };

  const handleFileChangePL = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const updatedFiles = [...selectedFilePL];
      updatedFiles[index] = files[0];
      setSelectedFilePL(updatedFiles);
    }
  };

  const handleFileChangeCL = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const updatedFiles = [...selectedFileCL];
      updatedFiles[index] = files[0];
      setSelectedFileCL(updatedFiles);
    }
  };

  return (
    <div>
      <div className="p-5">
        <Dialog open={open} onOpenChange={setisOpen}>
          <DialogTrigger className="flex items-center px-3 py-2 text-white bg-black rounded-sm focus:outline-none cursor-pointer">
            ADD INTERNSHIP
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Internship Details</DialogTitle>
            </DialogHeader>
            <form onSubmit={submitInternshipHandler}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="companyName" className="text-right">
                    Internship Name
                  </Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={handleNameChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duration
                  </Label>
                  <Input
                    id="duration"
                    value={duration}
                    onChange={handleDurationChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Input
                    id="status"
                    value={status}
                    onChange={handleStatusChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {internshipdata && internshipdata.length > 0 && (
        <div className=" mt-8">
          {internshipdata.map((internship: any, index: any) => (
            <Card key={index} className="w-[80vw] max-w-[150vh]">
              <CardHeader>
                <CardTitle className="text-3xl text-center">
                  INTERNSHIP DETAILS
                </CardTitle>
                <CardDescription className="text-lg text-center">
                  Internship details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                    <div className="flex flex-col justify-center space-y-2">
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor="companyName"
                          className="text-base font-semibold w-40"
                        >
                          Company Name :
                        </Label>
                        <div className="flex items-center border rounded-md px-3 py-1">
                          <span className="text-sm">
                            {internship?.companyName}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor="internshipType"
                          className="text-base font-semibold w-40"
                        >
                          Status :
                        </Label>
                        <div className="flex items-center border rounded-md px-3 py-1">
                          <span className="text-sm">{internship?.status}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor="startDate"
                          className="text-base font-semibold w-40"
                        >
                          Duration :
                        </Label>
                        <div className="flex items-center border rounded-md px-3 py-1">
                          <span className="text-sm">
                            {internship?.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="className=flex flex-col justify-center items-center mt-8">
                      <div className="w-full h-64 bg-gray-200 rounded-md flex flex-col justify-center items-center p-5">
                        <div className="flex items-center justify-evenly">
                          <p className="mr-4">Offer Letter : </p>
                          {selectedFileOL[index] ? (
                            <div className="flex  items-center">
                              <p className="p-2 m-2">
                                {selectedFileOL[index]?.name}
                              </p>
                              {selectedFileOL[index] && (
                                <button
                                  onClick={() =>
                                    openPdfInNewTab(
                                      selectedFileOL[index] as File
                                    )
                                  }
                                  className="px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer"
                                >
                                  Open PDF in New Tab
                                </button>
                              )}
                            </div>
                          ) : (
                            <Dialog>
                              <DialogTrigger className="flex items-center px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer">
                                Add Offer Letter
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Add Offer Letter</DialogTitle>
                                </DialogHeader>
                                <form
                                  onSubmit={(event) =>
                                    handleCompeletionOL(event, index)
                                  }
                                >
                                  <input
                                    type="file"
                                    onChange={(event) =>
                                      handleFileChangeOL(event, index)
                                    }
                                    accept=".pdf"
                                  />
                                  <DialogFooter className="p-5">
                                    <Button type="submit">Upload</Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                        <div className="flex items-center justify-evenly">
                          <p className="mr-4">Permission Letter : </p>
                          {selectedFilePL[index] ? (
                            <div className="flex  items-center">
                              <p className="p-2 m-2">
                                {selectedFilePL[index]?.name}
                              </p>
                              {selectedFilePL[index] && (
                                <button
                                  onClick={() =>
                                    openPdfInNewTab(
                                      selectedFilePL[index] as File
                                    )
                                  }
                                  className="px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer"
                                >
                                  Open PDF in New Tab
                                </button>
                              )}
                            </div>
                          ) : (
                            <Dialog>
                              <DialogTrigger className="flex items-center px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer">
                                Add Permission Letter
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    Add Permission Letter
                                  </DialogTitle>
                                </DialogHeader>
                                <form
                                  onSubmit={(event) =>
                                    handleCompeletionPL(event, index)
                                  }
                                >
                                  <input
                                    type="file"
                                    onChange={(event) =>
                                      handleFileChangePL(event, index)
                                    }
                                    accept=".pdf"
                                  />
                                  <DialogFooter className="p-5">
                                    <Button type="submit">Upload</Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>

                        <div className="flex items-center justify-evenly">
                          <p className="mr-4">Completion Letter : </p>
                          {selectedFileCL[index] ? (
                            <div className="flex  items-center">
                              <p className="p-2 m-2">
                                {selectedFileCL[index]?.name}
                              </p>
                              {selectedFileCL[index] && (
                                <button
                                  onClick={() =>
                                    openPdfInNewTab(
                                      selectedFileCL[index] as File
                                    )
                                  }
                                  className="px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer"
                                >
                                  Open PDF in New Tab
                                </button>
                              )}
                            </div>
                          ) : (
                            <Dialog>
                              <DialogTrigger className="flex items-center px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer">
                                Add Completion Letter
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    Add Completion Letter
                                  </DialogTitle>
                                </DialogHeader>
                                <form
                                  onSubmit={(event) =>
                                    handleCompeletionCL(event, index)
                                  }
                                >
                                  <input
                                    type="file"
                                    onChange={(event) =>
                                      handleFileChangeCL(event, index)
                                    }
                                    accept=".pdf"
                                  />
                                  <DialogFooter className="p-5">
                                    <Button type="submit">Upload</Button>
                                  </DialogFooter>
                                </form>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end"></CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default internship;
