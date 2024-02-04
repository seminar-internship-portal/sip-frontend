import React from "react";
import Link from "next/link";
export default function StudentDetails() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/dashboard/studentinfo/1">student 1</Link>
        </li>
        <li>
          <Link href="/dashboard/studentinfo/2">student 2</Link>
        </li>
        <li>
          <Link href="/dashboard/studentinfo/3">student 3</Link>
        </li>
        <li>
          <Link href="/dashboard/studentinfo/4">student 4</Link>
        </li>
        <li>
          <Link href="/dashboard/studentinfo/5">student 5</Link>
        </li>
      </ul> 
    </div>
  );
}
