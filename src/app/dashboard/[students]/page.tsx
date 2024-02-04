// ./src/app/dashboard/[students]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Student } from "@/app/dashboard/columns";

interface ApiResponse {
  id: string;
  username: string;
  email: string;
  fullName: string;
  mobileNo: string;
  rollNo: string;
  prnNo: string;
  registrationId: string;
}

async function getData(id: string): Promise<Student | null> {
  try {
    const response = await fetch(
      `https://sip-backend-api.onrender.com/api/v1/student`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: ApiResponse[] = await response.json();

    // Find the student with the matching ID
    const studentData = data.find((student) => student.id === id);

    if (!studentData) {
      return null;
    }

    const student: Student = {
      username: studentData.username,
      email: studentData.email,
      fullName: studentData.fullName,
      mobileNo: studentData.mobileNo,
      rollNo: studentData.rollNo,
      prnNo: studentData.prnNo,
      registrationId: studentData.registrationId,
      id: studentData.id,
    };

    return student;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

// Mark the component as a client component
StudentDetails.useClient = true;

interface StudentDetailsProps {
  studentId: string;
}

function StudentDetails({ studentId }: StudentDetailsProps) {
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (studentId) {
          const fetchedStudent = await getData(studentId);
          setStudent(fetchedStudent);

          if (!fetchedStudent) {
            setError("Student not found");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, [studentId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Student Details</h1>
      <p>Username: {student.username}</p>
      <p>Full Name: {student.fullName}</p>
      {/* Display other fields as needed */}
    </div>
  );
}

export default StudentDetails;
