"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Seminar = () => {
  const [seminarData, setSeminarData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [report, setReport] = useState<File | null>(null);
  const [abstract, setAbstract] = useState<File | null>(null);
  const [ppt, setPpt] = useState<File | null>(null);

  const fetchSeminarData = () => {
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
    const url = `https://sip-backend-api.onrender.com/api/v1/student/${student._id}/seminar`;
    axios
      .get(url, config)
      .then((response) => {
        setSeminarData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching Seminar Data:", error);
      });
  };

  useEffect(() => {
    fetchSeminarData();
  }, []); // Call fetchSeminarData only on component mount

  const submitSeminarHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    const data = {
      title: title,
      id: student._id,
    };
    const url = `https://sip-backend-api.onrender.com/api/v1/student/addSeminarDetails`;
    axios
      .post(url, data, config)
      .then((response) => {
        console.log(response.data.data);
        setOpen(false);
        // After successful submission, you may choose to fetch updated seminar data
        fetchSeminarData();
      })
      .catch((error) => {
        console.error("Error submitting Seminar Details:", error);
      });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFileChangeR = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setReport(file);
    }
  };

  const handleFileUploadR = (event: any) => {
    event.preventDefault();
    if (report) {
      const studentCookie = getCookie("Student");
      if (!studentCookie) {
        console.error("Student cookie not found");
        return;
      }

      const { accessToken, student } = JSON.parse(studentCookie);

      const formData = new FormData();
      formData.append("report", report);
      formData.append("id", student._id);
      console.log(formData);
      const url = `https://sip-backend-api.onrender.com/api/v1/student/uploadReport`;
      axios
        .post(url, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response: any) => {
          console.log("File uploaded successfully:", response.data);
          fetchSeminarData();
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      console.error("No file selected");
    }
  };
  const handleFileChangeA = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setAbstract(file);
    }
  };

  const handleFileUploadA = (event: any) => {
    event.preventDefault();
    if (abstract) {
      const studentCookie = getCookie("Student");
      if (!studentCookie) {
        console.error("Student cookie not found");
        return;
      }

      const { accessToken, student } = JSON.parse(studentCookie);

      const formData = new FormData();
      formData.append("abstract", abstract);
      formData.append("id", student._id);
      console.log(formData);
      const url = `https://sip-backend-api.onrender.com/api/v1/student/uploadAbstract`;
      axios
        .post(url, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response: any) => {
          console.log("File uploaded successfully:", response.data);
          fetchSeminarData();
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      console.error("No file selected");
    }
  };
  const handleFileChangeP = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setPpt(file);
    }
  };

  const handleFileUploadP = (event: any) => {
    event.preventDefault();
    if (ppt) {
      const studentCookie = getCookie("Student");
      if (!studentCookie) {
        console.error("Student cookie not found");
        return;
      }

      const { accessToken, student } = JSON.parse(studentCookie);

      const formData = new FormData();
      formData.append("ppt", ppt);
      formData.append("id", student._id);
      console.log(formData);
      const url = `https://sip-backend-api.onrender.com/api/v1/student/uploadppt`;
      axios
        .post(url, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response: any) => {
          console.log("File uploaded successfully:", response.data);
          fetchSeminarData();
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      console.error("No file selected");
    }
  };

  const test = () => {
    console.log(seminarData);
  };
  const openPdfInNewTab = (file: File) => {
    const pdfUrl = URL.createObjectURL(file);
    window.open(pdfUrl, "_blank");
  };

  return (
    <div>
      <div className="p-5">
        {seminarData.length === 0 && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex items-center px-3 py-2 text-white bg-black rounded-sm focus:outline-none cursor-pointer">
              ADD INTERNSHIP
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Internship Details</DialogTitle>
              </DialogHeader>
              <form onSubmit={submitSeminarHandler}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Internship Name
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={handleTitleChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      {seminarData.length > 0 && (
        <div className="flex justify-center items-center mt-8">
          <Card className="w-[80vw] max-w-[150vh]">
            <CardHeader>
              <CardTitle className="text-3xl text-center">
                SEMINAR DETAILS
              </CardTitle>
              <CardDescription className="text-lg text-center">
                Seminar details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                <div className="flex flex-col justify-center space-y-2">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="companyName"
                      className="text-base font-semibold w-40"
                    >
                      TITLE :
                    </Label>
                    <div className="flex items-center border rounded-md px-3 py-1">
                      <span className="text-sm">{seminarData[0].title}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center ">
                  <div className="w-full h-64 bg-gray-200 rounded-md ">
                    <div>
                      {seminarData.length > 0 && seminarData[0].report ? (
                        <div className="flex items-center">
                          <p className="p-2 m-2">Report</p>
                          <button
                            onClick={() =>
                              openPdfInNewTab(seminarData[0].report)
                            }
                            className="px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer"
                          >
                            Open PDF in New Tab
                          </button>
                        </div>
                      ) : (
                        <Dialog>
                          <DialogTrigger className="flex items-center px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer">
                            Add Report
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Report</DialogTitle>
                            </DialogHeader>
                            <form>
                              <input
                                type="file"
                                onChange={handleFileChangeR}
                                accept=".pdf"
                              />
                              <DialogFooter className="p-5">
                                <Button onClick={handleFileUploadR}>
                                  Upload
                                </Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>

                    <div>
                      {seminarData.length > 0 && seminarData[0].abstract ? (
                        <div className="flex items-center">
                          <p className="p-2 m-2">Abstract</p>
                          {seminarData[0].abstract && (
                            <button
                              onClick={() =>
                                window.open(seminarData[0].abstract, "_blank")
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
                            Add Abstract
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Abstract</DialogTitle>
                            </DialogHeader>
                            <form>
                              <input
                                type="file"
                                onChange={handleFileChangeA}
                                accept=".pdf"
                              />
                              <DialogFooter className="p-5">
                                <Button onClick={handleFileUploadA}>
                                  Upload
                                </Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>

                    <div>
                      {seminarData[0].ppt ? (
                        <div className="flex items-center">
                          <p className="mr-4">PPT :</p>
                          <button
                            onClick={() => openPdfInNewTab(seminarData[0].ppt)}
                            className="px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer"
                          >
                            Open PDF in New Tab
                          </button>
                        </div>
                      ) : (
                        <Dialog>
                          <DialogTrigger className="flex items-center px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer">
                            Add PPT
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add PPT</DialogTitle>
                            </DialogHeader>
                            <form>
                              <input
                                type="file"
                                onChange={handleFileChangeP}
                                accept=".pdf"
                              />
                              <DialogFooter className="p-5">
                                <Button onClick={handleFileUploadP}>
                                  Upload
                                </Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end"></CardFooter>
          </Card>
        </div>
      )}
      <Button onClick={test}>Test</Button>
    </div>
  );
};

export default Seminar;
