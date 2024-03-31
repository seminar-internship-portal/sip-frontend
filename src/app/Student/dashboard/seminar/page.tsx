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
  const [uploadProgressA, setUploadProgressA] = useState<number>(0);
  const [uploadProgressP, setUploadProgressP] = useState<number>(0); // Upload progress for ppt
  const [uploadProgressR, setUploadProgressR] = useState<number>(0);
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
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / (progressEvent.total ?? 1)) * 100
            );
            setUploadProgressR(progress);
          },
        })
        .then((response: any) => {
          console.log("File uploaded successfully:", response.data);
          // Reset progress and clear selected file
          setUploadProgressR(0);
          setReport(null);
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
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / (progressEvent.total ?? 1)) * 100
            );
            setUploadProgressA(progress);
          },
        })
        .then((response: any) => {
          console.log("File uploaded successfully:", response.data);
          // Reset progress and clear selected file
          setUploadProgressA(0);
          setAbstract(null);
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
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / (progressEvent.total ?? 1)) * 100
            );
            setUploadProgressP(progress);
          },
        })
        .then((response: any) => {
          console.log("File uploaded successfully:", response.data);
          // Reset progress and clear selected file
          setUploadProgressP(0);
          setPpt(null);
          fetchSeminarData();
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    } else {
      console.error("No file selected");
    }
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
              ADD Seminar Details
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Seminar Details</DialogTitle>
              </DialogHeader>
              <form onSubmit={submitSeminarHandler}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Seminar Name
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
          <Card className="w-[50vw] max-w-[150vh]">
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
                <div className="flex justify-center space-y-2">
                  <div className="flex items-center w-full max-w-xl">
                    <Label
                      htmlFor="companyName"
                      className="text-md font-semibold w-24 md:w-32 mr-2 md:mr-4 text-right"
                    >
                      TITLE:
                    </Label>
                    <div className="flex items-center  border rounded-md px-4 py-2 w-1/2">
                      <span className="text-base md:text-lg">
                        {seminarData[0].title}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center ">
                  <div className="w-3/4 h-64  rounded-md ">
                    <div>
                      {seminarData.length > 0 && seminarData[0].report ? (
                        <div className="flex items-center justify-between rounded-sm bg-slate-100 mt-2">
                          <p className="p-2 m-2">Report</p>
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                window.open(seminarData[0].report, "_blank")
                              }
                              className="px-3 py-2 m-3 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer"
                            >
                              Open PDF in New Tab
                            </button>
                            {/* <button
                              // onClick={handleDeleteAbstract}
                              className="px-3 py-2 m-3 text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button> */}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between rounded-sm bg-slate-100 mt-2">
                          <p className="p-2 m-2">
                            Upload the report to see it here.
                          </p>
                          <Dialog>
                            <DialogTrigger className="flex items-center px-3 py-2 m-3 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer">
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

                                {/* Progress Bar */}
                                <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                                    style={{
                                      width: `${uploadProgressR}%`,
                                      transition: "width 0.3s ease-in-out",
                                    }}
                                  ></div>
                                </div>
                                <div className="flex justify-between mt-2">
                                  <span className="text-xs text-gray-500">
                                    {uploadProgressA === 100
                                      ? "Upload Complete"
                                      : `${uploadProgressR}%`}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    Max: 100%
                                  </span>
                                </div>
                              </form>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </div>

                    <div>
                      {seminarData.length > 0 && seminarData[0].abstract ? (
                        <div className="flex items-center justify-between rounded-sm bg-slate-100 mt-2">
                          <p className="p-2 m-2">Abstract</p>
                          {seminarData[0].abstract && (
                            <button
                              onClick={() =>
                                window.open(seminarData[0].abstract, "_blank")
                              }
                              className="px-3 py-2 m-3 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer"
                            >
                              Open PDF in New Tab
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center justify-between rounded-sm bg-slate-100 mt-2">
                          <p className="p-2 m-2">
                            Upload the Abstract to see it here.
                          </p>
                          <Dialog>
                            <DialogTrigger className="flex items-center px-3 py-2 m-3 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer">
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
                                <DialogFooter className="p-5 ">
                                  <Button onClick={handleFileUploadA}>
                                    Upload
                                  </Button>
                                </DialogFooter>

                                {/* Progress Bar */}
                                <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                                    style={{
                                      width: `${uploadProgressA}%`,
                                      transition: "width 0.3s ease-in-out",
                                    }}
                                  ></div>
                                </div>
                                <div className="flex justify-between mt-2">
                                  <span className="text-xs text-gray-500">
                                    {uploadProgressA === 100
                                      ? "Upload Complete"
                                      : `${uploadProgressA}%`}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    Max: 100%
                                  </span>
                                </div>
                              </form>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </div>

                    <div>
                      {seminarData[0].ppt ? (
                        <div className="flex items-center justify-between rounded-sm bg-slate-100 mt-2">
                          <p className="m-2 p-2">PPT :</p>
                          <button
                            onClick={() =>
                              window.open(seminarData[0].ppt, "_blank")
                            }
                            className="px-3 py-2 m-3 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer"
                          >
                            Open PPT in New Tab
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between rounded-sm bg-slate-100 mt-2">
                          <p className="p-2 m-2">
                            Upload the PPT to see it here.
                          </p>
                          <Dialog>
                            <DialogTrigger className="flex items-center px-3 py-2 m-3 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer">
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
                                  accept=".ppt, .pptx"
                                />
                                <DialogFooter className="p-5">
                                  <Button onClick={handleFileUploadP}>
                                    Upload
                                  </Button>
                                </DialogFooter>
                                {/* Display progress bar */}
                                <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                                    style={{
                                      width: `${uploadProgressP}%`,
                                      transition: "width 0.3s ease-in-out",
                                    }}
                                  ></div>
                                </div>
                                <div className="flex justify-between mt-2">
                                  <span className="text-xs text-gray-500">
                                    {uploadProgressP === 100
                                      ? "Upload Complete"
                                      : `${uploadProgressP}%`}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    Max: 100%
                                  </span>
                                </div>
                              </form>
                            </DialogContent>
                          </Dialog>
                        </div>
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
    </div>
  );
};

export default Seminar;
