import {
ResponsiveContainer,
LineChart,
Line,
PieChart,
Pie,
Cell,
Tooltip
} from "recharts";

function DashboardCharts({ data }) {

const lineData = [
{ name:"Students", value:data.students },
{ name:"Teachers", value:data.teachers },
{ name:"Notices", value:data.notices },
{ name:"Files", value:data.files }
];

const pieData = [
{ name:"Students", value:data.students },
{ name:"Teachers", value:data.teachers },
{ name:"Files", value:data.files }
];

return (

<div className="chart-container">

<div className="chart-box">

<h2>📈 ERP Analytics</h2>

<ResponsiveContainer width="100%" height={300}>
<LineChart data={lineData}>
<Tooltip/>
<Line
type="monotone"
dataKey="value"
stroke="#4f46e5"
/>
</LineChart>
</ResponsiveContainer>

</div>

<div className="chart-box">

<h2>📊 Distribution</h2>

<ResponsiveContainer width="100%" height={300}>
<PieChart>
<Pie
data={pieData}
dataKey="value"
outerRadius={100}
>
<Cell fill="#4f46e5"/>
<Cell fill="#22c55e"/>
<Cell fill="#f97316"/>
</Pie>
<Tooltip/>
</PieChart>
</ResponsiveContainer>

</div>

</div>

);
}

export default DashboardCharts;