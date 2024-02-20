// xlsx.ts (downloadToExcel)
import xlsx, { IJsonSheet, ISettings } from "json-as-xlsx";
import getData from "@/constants/data";

export async function downloadToExcel(year:string) {
  try {
    const studentsData = await getData(year);

    let columns: IJsonSheet[] = [
      {
        sheet: "Students",
        columns: [
          { label: "Student Id", value: "id" },
          { label: "Username", value: "username" },
          { label: "Email", value: "email" },
          { label: "Mobile No", value: "mobileNo" },
          { label: "PRN Number", value: "prnNo" },
          { label: "Registration ID", value: "registrationId" },
        ],
        content: studentsData,
      },
    ];

    let settings: ISettings = {
      fileName: "Student File",
    };

    xlsx(columns, settings);
  } catch (error) {
    console.error("Error downloading data:", error);
  }
}
