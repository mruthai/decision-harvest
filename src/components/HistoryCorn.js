// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";

import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

export default function LineGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://www.nass.usda.gov/Charts_and_Maps/graphics/data/pricecn.txt"
      );
      const data = await response.text();
      console.log(data)
      const dataArray = data.split("\n").map((row) => row.split("\t"));
      setData(dataArray);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const dates = data.map((row) => row[0]);
      const prices = data.map((row) => row[1]);
      const ctx = document.getElementById("lineChart").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Price",
              data: prices,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    }
  }, [data]);

  return <canvas id="lineChart" width="400" height="400"></canvas>;
};





