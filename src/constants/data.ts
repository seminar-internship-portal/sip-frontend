// data.ts (getData)
import { Student } from "@/app/Mentor/columns";

function getData(year : string): Promise<Student[]> {
  const Baseurl = process.env.API_BASE_URL;
  return fetch(`${Baseurl}/student?year=${year}`, {
    next: { revalidate: 10 },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((resdata) => {
      const data = resdata.data;

      const students = data.map((item: any) => ({
        username: item.username,
        email: item.email,
        fullName: item.fullName,
        mobileNo: item.mobileNo,
        rollNo: item.rollNo,
        prnNo: item.prnNo,
        registrationId: item.registrationId,
        id: item.id,
      }));

      console.log(students);
      return students;
    });
}

export default getData;
