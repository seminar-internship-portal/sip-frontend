import React, { useEffect } from "react";

import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import styles from "./sidebar.module.css";
import { title } from "process";
import path from "path";
import { getCookie } from "cookies-next";
// import { selectMentor } from "@/app/features/username/Slice";
import { selectStudent } from "@/app/features/studentname/slice";
import { useSelector } from "react-redux";
const sidebar = () => {
  const student = useSelector(selectStudent);
  let role = localStorage.getItem("role");
  console.log(role);
  const menuItems = [
    {
      title: "",
      list: [
        {
          title: "Dashboard",
          path: `/${role}/dashboard`,
          icon: <MdDashboard />,
        },
        {
          title: "Profile",
          path: `/${role}/dashboard/profile`,
          icon: <MdSupervisedUserCircle />,
        },
      ],
    },
    {
      title: "",
      list: [
        {
          title: "Internship",
          path: `/${role}/dashboard/internship`,
          icon: <MdWork />,
        },
        {
          title: "Seminar",
          path: `/${role}/dashboard/seminar`,
          icon: <MdAnalytics />,
        },
        // {
        //   title: "Evolution",
        //   path: `/${role}/dashboard/evolution`,
        //   icon: <MdAnalytics />,
        // },
      ],
    },
    // {
    //   title: "",
    //   list: [
    //     {
    //       title: "Logout",
    //       path: "/login",
    //       icon: <MdLogout />,
    //     },
    //   ],
    // },
  ];
  return (
    <div className="sticky flex flex-col w-full h-screen bg-slate-950">
      {student && (
        <div className="flex-col gap-3 p-4">
          <div className="p-3 text-white">{student.username}</div>
          <div className="p-3">
            <Image
              className="object-cover rounded-full"
              src={student.avatar || "/noavatar.png"}
              alt="/public/noavatar.png"
              width={50}
              height={50}
            />
          </div>
        </div>
      )}

      <ul className="text-white">
        {menuItems.map((cat) => (
          <li className="my-2.5" key={cat.title}>
            <span className="text-xs font-bold md:text-base">{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default sidebar;
