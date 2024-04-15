"use client";
import { getCookie } from "cookies-next";
import React, { useEffect } from "react";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  FidgetSpinner,
  MagnifyingGlass,
  RotatingSquare,
} from "react-loader-spinner";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState<any>(null);
  const [ayear, setAyear] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStudent = async () => {
    try {
      setLoading(true);
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
      };
      const response = await fetch(
        `https://sip-backend-api.onrender.com/api/v1/student?year=${ayear}`,

        {
          headers: headers,
          method: "GET",
        }
      );
      if (!response.ok) {
        setLoading(false);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      // const filteredData = data.filter((student: any) => {
      //   return (
      //     !student.hasOwnProperty("mentorAssigned") || !student.mentorAssigned
      //   );
      // });
      // console.log(filteredData);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
      setLoading(false);
      return null;
    }
  };
  useEffect(() => {
    async function fetchDatastud() {
      const studentData = await fetchStudent();
      if (studentData) {
        setStudentData(studentData.data);
      }
    }

    fetchDatastud();
    console.log("filter data ", filteredData);
  }, [ayear]);

  const filteredData = studentData
    ? studentData
        .filter((item: any) => {
          // Check if mentorAssigned is not present, null, or undefined
          const mentorAssignedCondition =
            !item.hasOwnProperty("mentorAssigned") ||
            item.mentorAssigned === null ||
            item.mentorAssigned === undefined;

          // Check if any value in the item contains the searchTerm
          const searchTermCondition = Object.values(item).some((value: any) =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
          );

          // Combine both conditions using logical AND (&&)
          return mentorAssignedCondition && searchTermCondition;
        })
        .slice(0, 10) // Limit to the top 10 results
    : [];
  const copyToClipboard = (rollNo: any) => {
    navigator.clipboard.writeText(rollNo);
    toast.success("Copied to Clipboard");
  };
  return (
    <div>
      <div className="flex justify-start">
        <div className="relative p-5 flex items-center">
          <p className="mr-4 text-lg font-semibold">
            Please Select the Year :{" "}
          </p>
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{ayear || "YEAR"}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>ACADEMIC YEAR</DropdownMenuLabel>
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
        </div>
        {loading && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30 z-50">
            {/* <p className="text-lg font-semibold text-white">
              Fetching data please wait
            </p> */}
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="magnifying-glass-loading"
              glassColor="#c0efff"
              color="#000000"
            />
          </div>
        )}
      </div>
      <div className="p-2 ">
        {filteredData.length > 0 && (
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Mobile No
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Roll No
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                      >
                        Copy Roll No
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData.map((item: any, index: number) => (
                      <tr
                        key={item.id}
                        // className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item.fullName}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item.email}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                          {item.mobileNo}
                        </td>

                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800">
                          {item.rollNo}
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap  text-sm font-medium">
                          <Button
                            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparentdisabled:opacity-50 disabled:pointer-events-none"
                            onClick={() => {
                              copyToClipboard(item.rollNo);
                            }}
                          >
                            Copy
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="m-5">
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    </div>
  );
};

export default page;
