// page.tsx

import { Student, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Student[]> {
  const response = await fetch(
    "https://sip-backend-api.onrender.com/api/v1/student",
    {
      next: { revalidate: 10 },
    }
  );
  const resdata = await response.json();

  const data = resdata.data;

  if (!resdata.success) {
    throw new Error("Failed to fetch data");
  }

  const students: Student[] = data.map((item: any) => ({
    username: item.username,
    email: item.email,
    fullName: item.fullName,
    mobileNo: item.mobileNo,
    rollNo: item.rollNo,
    prnNo: item.prnNo,
    registrationId: item.registrationId,
    id: item.id,
  }));

  // console.log(students);
  return students;
}

export default async function StudentTable() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10 overflow-y-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
