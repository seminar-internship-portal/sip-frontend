"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const YourComponent = () => {
  const navigation = useRouter();

  const handleAddStudentClick = (e: any, type: string) => {
    e.preventDefault();
    navigation.push(`/admin/student/${type}`);
  };

  return (
    <div className="flex justify-center items-center gap-8">
      <div
        className="w-[50vh] h-[30vh] cursor-pointer bg-blue-200 rounded-xl"
        onClick={(e) => handleAddStudentClick(e, "createnew")}
      >
        <div className="h-full w-full flex justify-center items-center flex-col">
          <p className="text-center">Add New Student</p>
        </div>
      </div>
      <div
        className="w-[50vh] h-[30vh] cursor-pointer bg-red-200 rounded-xl "
        onClick={(e) => handleAddStudentClick(e, "delete")}
      >
        <div className="h-full w-full flex justify-center items-center flex-col">
          <p className="text-center">Delete Student</p>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
