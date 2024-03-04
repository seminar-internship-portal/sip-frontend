import React from "react";
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

const internship = () => {
  return (
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
              <div className="flex flex-col justify-center items-center">
                <div className="w-full h-64 bg-gray-200 rounded-md">
                  <p>hello</p>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end"></CardFooter>
      </Card>
    </div>
  );
};

export default internship;
