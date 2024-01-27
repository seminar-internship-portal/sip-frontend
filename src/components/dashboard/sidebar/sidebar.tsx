import React from "react";
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

const menuItems = [
  {
    title: "",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Profile",
        path: "/dashboard/profile",
        icon: <MdSupervisedUserCircle />,
      },
    ],
  },
  {
    title: "",
    list: [
      {
        title: "Internship",
        path: "/dashboard/internship",
        icon: <MdWork />,
      },
      {
        title: "Seminar",
        path: "/dashboard/seminar",
        icon: <MdAnalytics />,
      },
    ],
  },
  {
    title: "",
    list: [
      {
        title: "Logout",
        path: "/login",
        icon: <MdLogout />,
      },
    ],
  },
];

const sidebar = () => {
  return (
    <div className="sticky bg-slate-950 h-screen overflow-y-hidden">
      {/* <div className="flex items-center gap-5 mb-5 "></div> */}
      <div className="flex flex-col">
        <div className="p-4 flex-col gap-3">
          <div className="p-3 text-white">Amruta Patil</div>
          <div className="p-3">
            <Image
              className="object-cover rounded-full"
              src="/noavatar.png"
              alt="/public/noavatar.png"
              width={50}
              height={50}
            ></Image>
          </div>
        </div>
      </div>
      <ul>
        {menuItems.map((cat) => (
          <li className="text-white" key={cat.title}>
            <span className="font-[bold] text-[13px] mx-0 my-2.5">
              {cat.title}{" "}
            </span>
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
