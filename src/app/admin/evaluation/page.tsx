"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const YourComponent = () => {
  const navigation = useRouter();

  const handleAddMentorClick = (e: any, type: string) => {
    e.preventDefault();
    navigation.push(`/admin/evaluation/${type}`);
  };

  return (
    <div className="flex justify-center items-center gap-8 m-32">
      <div
        className="w-[50vh] h-[30vh] cursor-pointer bg-blue-300 rounded-xl"
        onClick={(e) => handleAddMentorClick(e, "internship")}
      >
        <div className="h-full w-full flex justify-center items-center flex-col">
          <p className="text-center text-xl">Internship</p>
        </div>
      </div>
      <div
        className="w-[50vh] h-[30vh] cursor-pointer bg-red-300 rounded-xl "
        onClick={(e) => handleAddMentorClick(e, "seminar")}
      >
        <div className="h-full w-full flex justify-center items-center flex-col">
          <p className="text-center text-xl">Seminar</p>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
