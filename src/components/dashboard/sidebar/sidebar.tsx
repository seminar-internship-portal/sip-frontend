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
import { getCookie } from "cookies-next";

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

const sidebar = () => {
  return (
    <div className="sticky flex flex-col w-full h-screen bg-slate-950">
      <div className="flex-col gap-3 p-4">
        <div className="p-3 text-white">Amruta Patil</div>
        <div className="p-3">
          <Image
            className="object-cover rounded-full"
            src="/noavatar.png"
            alt="/public/noavatar.png"
            width={50}
            height={50}
          />
        </div>
      </div>
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
