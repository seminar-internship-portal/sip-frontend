//page.tsx
"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getCookie } from "cookies-next";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const page = () => {
  const getdata = async () => {
    try {
      const studentCookie = getCookie("Student");
      if (!studentCookie) {
        console.error("Student cookie not found");
        return;
      }
      console.log(studentCookie);

      const { accessToken } = JSON.parse(studentCookie);
      console.log(accessToken);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        credentials: "include",
      };
      // Update profile in the backend API
      const response = await fetch(
        "https://sip-backend-api.onrender.com/api/v1/student/updateAccountDetails",
        {
          method: "POST",
          headers: headers,
        }
      );
      console.log(response);
    } catch (error) {}
  };
  return (
    <div className="flex justify-center content-center items-center px-10 m-16x p-14">
      <ScrollArea className="h-96 w-96 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          {tags.map((tag) => (
            <>
              <div key={tag} className="text-sm">
                {tag}
              </div>
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea>
      <button onClick={getdata}>Hello</button>
    </div>
  );
};

export default page;
