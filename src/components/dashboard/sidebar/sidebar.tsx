import React from "react";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdWork,
  MdAnalytics,
} from "react-icons/md";
import MenuLink from "./menuLink/menuLink";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectMentor } from "@/app/features/username/Slice";

const Sidebar = () => {
  // Fetch mentor data from Redux
  const mentor = useSelector(selectMentor);
  let role = localStorage.getItem("role");

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
        {
          title: "Evaluation",
          path: `/${role}/dashboard/evaluation`,
          icon: <MdAnalytics />,
        },
      ],
    },
  ];

  return (
    <div className="sticky flex flex-col w-full h-screen bg-slate-950">
      {/* Render mentor data if it exists */}
      {mentor && (
        <div className="flex-col gap-3 p-4">
          <div className="p-3 text-white">{mentor.username}</div>
          <div className="p-3">
            <Image
              className="object-cover rounded-full"
              src={mentor.avatar || "/noavatar.png"}
              alt="/public/noavatar.png"
              width={50}
              height={50}
            />
          </div>
        </div>
      )}
      {/* Render menu items */}
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

export default Sidebar;
