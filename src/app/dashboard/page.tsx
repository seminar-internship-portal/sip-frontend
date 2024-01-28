import { Student, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Student[]> {
  const response = await fetch("http://localhost:8000/api/v1/student");
  const resdata = await response.json();

  const data = resdata.data;

  if (!resdata.success) {
    throw new Error("Failed to fetch data");
  }

  // Map the API response to the Student type
  const students: Student[] = data.map((item: any) => ({
    username: item.username,
    email: item.email,
    fullName: item.fullName,
    mobileNo: item.mobileNo,
    rollNo: item.rollNo,
    prnNo: item.prnNo,
    registrationId: item.registrationId,
  }));

  return students;
}
export default async function StudentTable() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
