"use client";

import React, { useState } from "react";
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link, MoveRight } from "lucide-react";

const internship = () => {
  const handleFileUpload = () => {};
  const [reportUploaded, setReportUploaded] = useState(false);
  const [offerLetterUploaded, setOfferLetterUploaded] = useState(false);
  const [permissionLetterUploaded, setPermissionLetterUploaded] =
    useState(false);
  return (
    <div>
      <div className="flex justify-center items-center mt-8">
        <Card className="w-[80vw] max-w-[150vh]">
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
                      Company Name:
                    </Label>
                    <div className="flex items-center border rounded-md px-3 py-1">
                      <span className="text-sm">Test Company</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="internshipType"
                      className="text-base font-semibold w-40"
                    >
                      Internship Type:
                    </Label>
                    <div className="flex items-center border rounded-md px-3 py-1">
                      <span className="text-sm">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="startDate"
                      className="text-base font-semibold w-40"
                    >
                      Start Date:
                    </Label>
                    <div className="flex items-center border rounded-md px-3 py-1">
                      <span className="text-sm">10-10-2022</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="endDate"
                      className="text-base font-semibold w-40"
                    >
                      End Date:
                    </Label>
                    <div className="flex items-center border rounded-md px-3 py-1">
                      <span className="text-sm">11-10-2022</span>
                    </div>
                  </div>
                </div>

                {/* <div className="flex flex-col justify-center items-center">
                <div className="w-full h-64 bg-gray-200 rounded-md flex flex-col justify-center items-center p-5">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-2xl">Offer Letter</span>
                    <span>
                      <Input type="file" className="hidden" />
                      <label
                        htmlFor="offerLetter"
                        className="px-3 py-1 border rounded-md cursor-pointer bg-black text-white hover:bg-blue-600"
                      >
                        Upload
                      </label>
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-2xl">PICt Permission Letter</span>
                    <span>
                      <input type="file" className="hidden" />
                      <label
                        htmlFor="pictPermission"
                        className="px-3 py-1 border rounded-md cursor-pointer bg-black text-white hover:bg-blue-600"
                      >
                        Upload
                      </label>
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-2xl">Report</span>
                    <span>
                      <input type="file" className="hidden" />
                      <label
                        htmlFor="report"
                        className="px-3 py-1 border rounded-md cursor-pointer bg-black text-white hover:bg-blue-600"
                      >
                        Upload
                      </label>
                    </span>
                  </div>
                </div>
              </div> */}
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end"></CardFooter>
        </Card>
      </div>
      <div className="flex flex-col justify-center items-center mt-8">
        <Card className="w-[80vw] max-w-[150vh]">
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-evenly">
                <p className="mr-4">Report:</p>
                <div className="flex gap-4">
                  {/* <Dialog>
                    <DialogTrigger asChild>
                      <Button className="rounded-full shadow" variant="outline">
                        File upload
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-center">
                          Upload your files
                        </DialogTitle>
                        <DialogDescription className="text-center">
                          The only file upload you will ever need
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <ImageUpload />
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Link className="flex gap-1 items-center" href={"/"}>
                    Github
                    <MoveRight size={15} />
                  </Link> */}
                </div>
              </div>
              <div className="flex items-center justify-evenly">
                <p className="mr-4">Offer Letter:</p>
                <Dialog>
                  <DialogTrigger className="flex items-center px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer">
                    {offerLetterUploaded
                      ? "Offer Letter Uploaded"
                      : "Upload Offer Letter"}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center justify-evenly">
                <p className="mr-4">Permission Letter:</p>
                <Dialog>
                  <DialogTrigger className="flex items-center px-3 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer">
                    {permissionLetterUploaded
                      ? "Permission Letter Uploaded"
                      : "Upload Permission Letter"}
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default internship;
