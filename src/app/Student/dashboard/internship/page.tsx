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
import { Blocks } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
const internship = () => {
  const [companyName, setCompanyName] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("");
  const [internshipdata, setInternshipData] = useState([]);
  const student = useSelector(selectStudent);
  const [loading, setLoading] = useState(false);
  // completetion Letter
  const [selectedFileCL, setSelectedFileCL] = useState<Array<File | null>>([]);
  const [loadingCL, setloadingCL] = useState(false);

  const [selectedFilePL, setSelectedFilePL] = useState<Array<File | null>>([]);
  const [selectedfilePLT, setSelectedFilePLT] = useState<any>(null);

  //Offer Letter
  const [selectedFileOL, setSelectedFileOL] = useState<Array<File | null>>([]);
  const [loadingOL, setloadingOL] = useState(false);

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
          setisOpen(false);
          fetchInternshipData();
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
    index: number,
    id: number
  ) => {
    event.preventDefault();
    setloadingOL(true);
    const file = selectedFileOL[index];
    if (file) {
      const studentCookie = getCookie("Student");
      if (!studentCookie) {
        console.error("Student cookie not found");
        setloadingOL(false);
        return;
      }

      const { accessToken, student } = JSON.parse(studentCookie);

      const formData = new FormData();
      formData.append("offerLetter", file);
      formData.append("id", id.toString());
      console.log(formData);
      const url = `https://sip-backend-api.onrender.com/api/v1/student/uploadOfferLetter`;
      axios
        .post(url, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response: any) => {
          console.log("File uploaded successfully:", response.data);
          fetchInternshipData();
          toast.success("File uploaded successfully");
          setloadingOL(false);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          toast.error("Error uploading file");
          setloadingOL(false);
        });
    } else {
      console.error("No file selected");
      toast.error("No file selected");
      setLoading(false);
    }

    // Proceed with uploading the file
  };

  const handleCompeletionPL = (
    event: React.FormEvent<HTMLFormElement>,
    index: number,
    id: number
  ) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true when upload starts
    const file = selectedFilePL[index];
    if (file) {
      const studentCookie = getCookie("Student");
      if (!studentCookie) {
        console.error("Student cookie not found");
        setLoading(false); // Reset loading state
        return;
      }
      const { accessToken, student } = JSON.parse(studentCookie);
      const formData = new FormData();
      formData.append("permissionLetter", file);
      formData.append("id", id.toString());
      console.log(formData);
      const url = `https://sip-backend-api.onrender.com/api/v1/student/uploadPermissionLetter`;
      axios
        .post(url, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response: any) => {
          console.log("File uploaded successfully:", response.data);
          fetchInternshipData();
          setLoading(false); // Reset loading state when upload finishes
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          setLoading(false); // Reset loading state on error
        });
    } else {
      console.error("No file selected");
      setLoading(false); // Reset loading state
    }
  };

  const handleCompeletionCL = (
    event: React.FormEvent<HTMLFormElement>,
    index: number,
    id: number
  ) => {
    event.preventDefault();
    setloadingCL(true);
    const file = selectedFileCL[index];
    if (file) {
      const studentCookie = getCookie("Student");
      if (!studentCookie) {
        setloadingCL(false);
        console.error("Student cookie not found");
        return;
      }

      const { accessToken, student } = JSON.parse(studentCookie);

      const formData = new FormData();
      formData.append("completionLetter", file);
      formData.append("id", id.toString());
      console.log(formData);
      const url = `https://sip-backend-api.onrender.com/api/v1/student/uploadCompletionLetter`;
      axios
        .post(url, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response: any) => {
          console.log("File uploaded successfully:", response.data);
          fetchInternshipData();
          toast.success("File uploaded successfully");
          setloadingCL(false);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          toast.error("Error uploading file");
          setloadingCL(false);
        });
    } else {
      console.error("No file selected");
      toast.error("No file selected");
      setloadingCL(false);
    }

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
                    Duration (in weeks)
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
                      <div className="w-full h-64 bg-slate-200 rounded-md flex flex-col justify-center items-center p-5">
                        <div className="w-full flex items-center justify-evenly  rounded-sm bg-white mt-2">
                          {loadingOL ? (
                            <div className="flex items-center">
                              <p className="p-2 m-2">Uploading file...</p>
                              <Blocks
                                height="40"
                                width="40"
                                color="#4fa94d"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                visible={true}
                              />
                            </div>
                          ) : (
                            <>
                              {internship.offerLetter ? (
                                <div className="w-full flex items-center justify-between rounded-sm bg-white mt-2">
                                  <p className="p-2 m-2">Offer Letter :</p>
                                  <div className="flex">
                                    <button
                                      onClick={() =>
                                        window.open(
                                          internship.offerLetter,
                                          "_blank"
                                        )
                                      }
                                      className="px-3 py-2 m-3 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none cursor-pointer"
                                    >
                                      Open PDF in New Tab
                                    </button>
                                    <button
                                      // Add functionality for deleting the offer letter if needed
                                      className="px-3 py-2 m-3 text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none cursor-pointer"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="w-full flex items-center justify-between rounded-sm bg-white mt-2">
                                  <p className="p-2 m-2">
                                    Upload the offer letter to see it here.
                                  </p>
                                  <Dialog>
                                    <DialogTrigger className="flex items-center px-3 py-2 m-3 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none cursor-pointer">
                                      Add Offer Letter
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>
                                          Add Offer Letter
                                        </DialogTitle>
                                      </DialogHeader>
                                      <form
                                        onSubmit={(event) =>
                                          handleCompeletionOL(
                                            event,
                                            index,
                                            internship._id
                                          )
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
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        <div className="w-full flex items-center justify-between rounded-sm bg-white mt-2">
                          {loading ? ( // Check if loading state is true
                            <div className="flex items-center">
                              <p className="p-2 m-2">Uploading file...</p>
                              <Blocks
                                height="40"
                                width="40"
                                color="#4fa94d"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                visible={true}
                              />
                            </div>
                          ) : (
                            <div className="w-full flex items-center justify-evenly ">
                              {internship.permissionLetter ? (
                                <div className="w-full flex items-center justify-between  rounded-sm bg-white mt-2">
                                  <p className="p-2 m-2">Permission Letter :</p>
                                  <div>
                                    <button
                                      onClick={() =>
                                        window.open(
                                          internship.permissionLetter,
                                          "_blank"
                                        )
                                      }
                                      className="px-3 py-2 m-3 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none cursor-pointer"
                                    >
                                      Open PDF in New Tab
                                    </button>
                                    <button
                                      // Add functionality for deleting the permission letter if needed
                                      className="px-3 py-2 m-3 text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none cursor-pointer"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="w-full flex items-center justify-between rounded-sm bg-white mt-2">
                                  <p className="p-2 m-2">
                                    Upload the PDF file for the Permission
                                    Letter :
                                  </p>
                                  <Dialog>
                                    <DialogTrigger className="flex items-center px-3 py-2 m-3 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none cursor-pointer">
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
                                          handleCompeletionPL(
                                            event,
                                            index,
                                            internship._id
                                          )
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
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="w-full flex items-center justify-evenly rounded-sm bg-white mt-2">
                          {loadingCL ? (
                            <div className="flex items-center">
                              <p className="p-2 m-2">Uploading file...</p>
                              <Blocks
                                height="40"
                                width="40"
                                color="#4fa94d"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                visible={true}
                              />
                            </div>
                          ) : (
                            <>
                              {internship.completionLetter ? (
                                <div className="w-full flex items-center justify-between rounded-sm bg-white mt-2">
                                  <p className="p-2 m-2">Completion Letter :</p>
                                  <div className="flex">
                                    <button
                                      onClick={() =>
                                        window.open(
                                          internship.completionLetter,
                                          "_blank"
                                        )
                                      }
                                      className="px-3 py-2 m-3 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none cursor-pointer"
                                    >
                                      Open PDF in New Tab
                                    </button>
                                    <button
                                      // Add functionality for deleting the completion letter if needed
                                      className="px-3 py-2 m-3 text-white bg-red-500 rounded-md hover:bg-red-700 focus:outline-none cursor-pointer"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="w-full flex items-center justify-between rounded-sm bg-white mt-2">
                                  <p className="p-2 m-2">
                                    Upload the PDF file for the Completion
                                    Letter :
                                  </p>
                                  <Dialog>
                                    <DialogTrigger className="flex items-center px-3 py-2 m-3 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none cursor-pointer">
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
                                          handleCompeletionCL(
                                            event,
                                            index,
                                            internship._id
                                          )
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
                                </div>
                              )}
                            </>
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
