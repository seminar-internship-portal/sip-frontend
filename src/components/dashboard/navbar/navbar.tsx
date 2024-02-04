"use client";
import { usePathname, useRouter } from "next/navigation";
import styles from "./navbar.module.css";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
  MdLogout,
} from "react-icons/md";
import { deleteCookie } from "cookies-next";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = () => {
    // Clear user data from localStorage
    deleteCookie("user");
    // Redirect to the login page
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.icons}>
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
        <button
          className="flex flex-row items-center gap-4 px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleLogout}
        >
          <MdLogout size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
