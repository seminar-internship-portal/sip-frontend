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
import { selectAdmin } from "@/app/features/adminname/slice";
import { useSelector } from "react-redux";
const sidebar = () => {
  const admin = useSelector(selectAdmin);
  let role = localStorage.getItem("role");
  console.log(role);
  const menuItems = [
    {
      title: "",
      list: [
        {
          title: "Dashboard",
          path: `/${role?.toLowerCase()}/dashboard`,
          icon: <MdDashboard />,
        },
      ],
    },
    {
      title: "Add new ",
      list: [
        {
          title: "Mentor",
          path: `/${role?.toLowerCase()}/mentor`,
          icon: <MdSupervisedUserCircle />,
        },
        {
          title: "Student",
          path: `/${role?.toLowerCase()}/student`,
          icon: <MdSupervisedUserCircle />,
        },
      ],
    },
    {
      title: "Changes",
      list: [
        {
          title: "Assign Mentor",
          path: `/${role?.toLowerCase()}/assignmentor`,
          icon: <MdWork />,
        },
        {
          title: "Evaluation",
          path: `/${role?.toLowerCase()}/evaluation`,
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
  return (
    <div className="sticky flex flex-col w-full h-screen bg-slate-950">
      {admin && (
        <div className="flex-col gap-3 p-4">
          <div className="p-3 text-white">{admin.username}</div>
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
