// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(Tooltip, Legend);

export default function Piechart({ ay }) {
  const [chartData, setChartData] = useState({});
  const [chartLabels, setChartLabels] = useState([]);

  const baseUrl = process.env.API_BASE_URL;
  const url = `${baseUrl}/student/internship?academicYear=${ay}`;
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
      const company = stud.companyName;
      st.add(company);
      if (mp.hasOwnProperty(company)) {
        mp[company]++;
      } else {
        mp[company] = 1;
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
        text: `Internship Companywise distribution AY : ${ay}`,
      },
    },
  };

  const bgColors = ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)"];
  const brdrColors = ["rgb(255, 99, 132)", "rgb(255, 159, 64)"];

  return (
    <Pie
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
