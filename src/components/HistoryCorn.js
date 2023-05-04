import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function MyGraph() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://www.nass.usda.gov/Charts_and_Maps/graphics/data/pricecn.txt");
      const text = await response.text();
      const parsedData = parseText(text);
      setData(parsedData);
    }

    fetchData();
  }, []);

  function parseText(text) {
    

    const lines = text.trim().split("\n");
    const labels = [];
    const values = [];

    for (let i = 0; i < lines.length; i++) {
      const parts = lines[i].split(",");
      labels.push(parts[0]);
      values.push(parseInt(parts[1]));
    }

    return {
      labels: labels,
      datasets: [
        {
          label: "My Data",
          data: values,
        },
      ],
    };
  }

  return (
    <div>
      <Line data={data} />
    </div>
  );
}


