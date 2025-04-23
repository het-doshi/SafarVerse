import React from "react";
import { PieChart, Pie, Cell, Tooltip} from "recharts";

const data = [
  { name: "Single", value: 50, color: "#3498db" }, // Blue
  { name: "Couples", value: 20, color: "#e74c3c" }, // Red
  { name: "Family & Group", value: 10, color: "#f1c40f" }, // Yellow
];

const Chart = () => {
  return (
    <>
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold text-center">Booking Chart</h2>
      <PieChart width={300} height={250} >
        <Pie
          data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} 
          fill="#8884d8" dataKey="value" label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div className="mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span
              className="flex items-center"
              style={{ color: item.color }}
            >
              ● {item.name}
            </span>
            <span>  {item.value}</span>
          </div>
        ))}
      </div>
    </div>
    
   </>
    
  );
};

export default Chart;
