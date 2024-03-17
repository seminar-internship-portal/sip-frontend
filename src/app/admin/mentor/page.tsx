"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const navigation = useRouter();

  const handleAddMentorClick = (e: any, type: string) => {
    e.preventDefault();
    navigation.push(`/admin/mentor/${type}`);
  };

  return (
    <div className="flex justify-center items-center gap-8 m-32">
      <div
        className="w-[50vh] h-[30vh] cursor-pointer bg-blue-300 rounded-xl"
        onClick={(e) => handleAddMentorClick(e, "createnew")}
      >
        <div className="h-full w-full flex justify-center items-center flex-col">
          <p className="text-center">Add New Mentor</p>
        </div>
      </div>
      <div
        className="w-[50vh] h-[30vh] cursor-pointer bg-red-300 rounded-xl "
        onClick={(e) => handleAddMentorClick(e, "delete")}
      >
        <div className="h-full w-full flex justify-center items-center flex-col">
          <p className="text-center">Delete Mentor</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
