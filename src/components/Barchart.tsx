"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Barchart() {
  const [chartData, setChartData] = useState({});
  const [chartLabels, setChartLabels] = useState([]);

  const baseUrl = process.env.API_BASE_URL;
  const url = `${baseUrl}/student/internship`;
  const cookie: any =
    getCookie("Student") || getCookie("Admin") || getCookie("Mentor");

  if (!cookie) {
    console.log("No cookie found!");
    return;
  }

  const { accessToken } = JSON.parse(cookie);

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const fetchData = async () => {
    const res = await axios.get(url, config);
    const dataArr = res.data.data;
    let st: any = new Set();
    let mp: any = {};

    dataArr.forEach((stud: any) => {
      st.add(stud.academicYear);
      if (mp.hasOwnProperty(stud.academicYear)) {
        mp[stud.academicYear]++;
      } else {
        mp[stud.academicYear] = 1;
      }
    });

    let arr: any = Array.from(st).sort();
    setChartLabels(arr);
    setChartData(mp);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Internship Statistics",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "No. of Students",
        },
      },
      x: {
        title: {
          display: true,
          text: "Academic Year",
        },
      },
    },
  };

  const bgColors = ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)"];
  const brdrColors = ["rgb(255, 99, 132)", "rgb(255, 159, 64)"];

  return (
    <Bar
      options={options}
      data={{
        labels: chartLabels,
        datasets: [
          {
            label: "Internships",
            data: chartLabels.map((el: never) => chartData[el]),
            backgroundColor: chartLabels.map(
              (_, i) => bgColors[i % bgColors.length]
            ),
            borderColor: chartLabels.map(
              (_, i) => brdrColors[i % brdrColors.length]
            ),
            borderWidth: 1,
          },
        ],
      }}
    />
  );
}
