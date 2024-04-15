"use client";
import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";
import axios from "axios";

const page = () => {
  const [datei, setDatei] = React.useState<Date>();
  const [dates, setDates] = React.useState<Date>();
  const baseUrl = process.env.API_BASE_URL;

  const handleSubmitSeminar = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const adminCookies = getCookie("Admin");
    if (!adminCookies) {
      console.error("Admin cookie not found");
      return;
    }
    console.log(adminCookies);
    const { accessToken } = JSON.parse(adminCookies);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // credentials: "include",
    };
    if (!dates) {
      // Show error message if date is not picked
      console.error("Please pick a date");
      toast.error("Please pick a date");
      // Optionally display an error message to the user
      // e.g., setErrorMessage('Please pick a date');
      return;
    }
    const date = new Date(dates);
    const formattedDate = format(date, "yyyy-MM-dd");
    console.log(formattedDate);
    try {
      const response = await axios.post(
        `${baseUrl}/admin/setSeminarDeadline`,
        {
          deadlineDate: formattedDate,
        },
        { headers }
      );

      console.log(response.data);

      if (response.status === 200) {
        console.log("deadline added successfully");
        toast.success("deadline added successfully");
      } else {
        console.error("Error Adding Deadline:", response.statusText);
        // Handle error
      }
    } catch (error: any) {
      console.error("Error occurred ", error);
      toast.error(error.message);
    }
  };
  const handleSubmitinternship = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log(datei?.toISOString().slice(0, 10));
    console.log(datei);

    const adminCookies = getCookie("Admin");
    if (!adminCookies) {
      console.error("Admin cookie not found");
      return;
    }
    console.log(adminCookies);
    const { accessToken } = JSON.parse(adminCookies);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // credentials: "include",
    };
    if (!datei) {
      // Show error message if date is not picked
      console.error("Please pick a date");
      toast.error("Please pick a date");
      // Optionally display an error message to the user
      // e.g., setErrorMessage('Please pick a date');
      return;
    }
    const date = new Date(datei);
    const formattedDate = format(date, "yyyy-MM-dd");
    console.log(formattedDate);

    try {
      const response = await axios.post(
        `${baseUrl}/admin/setInternshipDeadline`,
        {
          deadlineDate: formattedDate,
        },
        { headers }
      );

      console.log(response.data);

      if (response.status === 200) {
        console.log("deadline added successfully");
        toast.success("deadline added successfully");
      } else {
        console.error("Error Adding Deadline:", response.statusText);
        // Handle error
      }
    } catch (error: any) {
      console.error("Error occurred ", error);
      toast.error(error.message);
    }
  };
  return (
    <div>
      {/* <div className="flex flex-col items-center justify-center border rounded-md p-5"> */}
      <div className="flex flex-col items-center justify-center  rounded-md ml-14 mr-14 p-5 border-gray-300 border-4">
        <div className="mb-4">
          <div className="border border-gray-300 bg-red-500 rounded-md p-1 w-52 text-center text-white font-bold">
            IMPORTANT
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Please read the following carefully:
          </p>
        </div>
        <div className="flex justify-start m-5 p-5">
          <ul className="list-disc font-semibold text-lg text-gray-700">
            <li>
              These are the deadlines for students to submit their internship
              and seminar PDFs.
            </li>
            <li>Students must submit the PDFs before the deadline.</li>
            <li>
              If failed to do so, students must meet with their respective
              mentor.
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center pt-5 w-full">
        <div className="flex flex-col md:flex-row items-center gap-2 w-full">
          <div className="flex-col items-center w-3/4 justify-center gap-5">
            <div className="flex pb-5 justify-center ">
              <div className="border-2 border-gray-300 bg-red-500 rounded-l-md p-1 w-42 text-center text-white font-bold">
                <p>Deadline Date For Internship:</p>
              </div>
              <div className="border-2 border-gray-300 rounded-r-md p-1 w-32 text-center  font-bold">
                <p> {datei?.toLocaleDateString()} </p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Dead-Line for Intership(Pdfs)</CardTitle>
                <CardDescription>
                  <p>Pick a date</p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <p>
                    {datei ? datei.toLocaleDateString() : "No date selected"}
                  </p>
                </div>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !datei && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {datei ? (
                          format(datei, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={datei}
                        onSelect={setDatei}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
              <CardFooter>
                <div>
                  <Button
                    onClick={(event: any) => handleSubmitinternship(event)}
                  >
                    Submit
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="flex-col items-center w-3/4 justify-center gap-5">
            <div className="flex pb-5 justify-center ">
              <div className="border-2 border-gray-300 bg-red-500 rounded-l-md p-1 w-42 text-center text-white font-bold">
                <p>Deadline Date For Seminar:</p>
              </div>
              <div className="border-2 border-gray-300 rounded-r-md p-1 w-32 text-center  font-bold">
                <p> {dates?.toLocaleDateString()} </p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Dead-Line for Seminar(Pdfs)</CardTitle>
                <CardDescription>Pick a date</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <p>
                    {dates ? dates.toLocaleDateString() : "No date selected"}
                  </p>
                </div>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !dates && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dates ? (
                          format(dates, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dates}
                        onSelect={setDates}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
              <CardFooter>
                <div>
                  <Button onClick={(event: any) => handleSubmitSeminar(event)}>
                    Submit
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
