import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(
          "http://localhost/Engraved-Clone/EngravedElegance/backend/Dashboard/Revenue.php"
        )
        .then(() =>
          axios.get(
            "http://localhost/Engraved-Clone/EngravedElegance/backend/Dashboard/GetRevenueHistory.php"
          )
        )
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching chart data:", err);
          setData([{ name: "Error", earnings: 0, sales: 0, orders: 0 }]);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white flex justify-start 
    custom-tablet:text-[12px]
    custom-mobileSmall:text-[10px]">
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 0, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis width={30} />
            <Tooltip
              formatter={(value, name) => {
                if (name === "earnings" || name === "sales") {
                  return [
                    `₱${value.toLocaleString()}`,
                    name.charAt(0).toUpperCase() + name.slice(1),
                  ];
                }
                return [value, name.charAt(0).toUpperCase() + name.slice(1)];
              }}
            />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#ea580c"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
