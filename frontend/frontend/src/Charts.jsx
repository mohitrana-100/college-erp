import { useEffect, useState } from "react";

import API from "./api";

import {

Chart as ChartJS,

ArcElement,

Tooltip,

Legend

} from "chart.js";

import { Pie } from "react-chartjs-2";


ChartJS.register(

ArcElement,

Tooltip,

Legend

);


function Charts() {

const [stats, setStats] = useState({

students: 0,

teachers: 0,

notices: 0,

fees: 0

});


useEffect(() => {

getStats();

}, []);


const getStats = async () => {

try {

const res = await API.get(

"/statistics"

);

setStats(

res.data

);

}

catch(err){

console.log(err);

}

};


const data = {

labels: [

"Students",

"Teachers",

"Notices",

"Pending Fees"

],

datasets: [

{

data: [

stats.students,

stats.teachers,

stats.notices,

stats.fees

]

}

]

};


return (

<div>

<h2>

📈 ERP Analytics

</h2>

<Pie data={data} />

</div>

);

}


export default Charts;