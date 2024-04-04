// data.ts (getData)
// @ts-nocheck
import { Student } from "@/app/Mentor/columns";
import { selectMentor } from "@/app/features/username/Slice";
import { getCookie } from "cookies-next";
import { useSelector } from "react-redux";

function getData(year : string): Promise<Student[]> {
  const Baseurl = process.env.API_BASE_URL;
  const mentorCookie = getCookie("Mentor");
  if (!mentorCookie) {
    console.error("Mentor cookie not found");
  }

  const { accessToken  , mentor } = JSON.parse(mentorCookie);

  console.log(mentor._id )
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    credentials: "include",
  };
  return fetch( 
    `https://sip-backend-api.onrender.com/api/v1/mentor/studentAssigned/${mentor._id}?academicYear=${year}`,{
    next: { revalidate: 10 },
    headers: headers,
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((resdata) => {
      const data = resdata.data;

      const students = data.map((item: any) => ({
        username: item.username,
        email: item.email,
        fullName: item.fullName,
        mobileNo: item.mobileNo,
        rollNo: item.rollNo,
        prnNo: item.prnNo,
        registrationId: item.registrationId,
        id: item.id,
      }));

      console.log(students);
      return students;
    });
}

export default getData;
