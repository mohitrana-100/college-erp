import { useEffect, useState } from "react";

import API from "./api";

import { motion } from "framer-motion";

function Files({ user }) {

const sections=[

{
title:"🎓 Student Data",
category:"student_data"
},

{
title:"📝 Marks Files",
category:"marks"
},

{
title:"📅 Attendance Files",
category:"attendance"
},

{
title:"🗓 Timetable Files",
category:"timetable"
},

{
title:"📆 College Calendar",
category:"calendar"
}

];


const [selected,setSelected]=useState(

"student_data"

);

const [files,setFiles]=useState([]);

const [file,setFile]=useState(null);


useEffect(()=>{

getFiles();

},[selected]);


const getFiles=async()=>{

try{

const res=await API.get(

`/files?category=${selected}`

);

setFiles(

res.data

);

}

catch(err){

console.log(err);

}

};


const uploadFile=async()=>{

if(!file){

return alert(

"Select a file"

);

}

try{

const formData=new FormData();

formData.append(

"file",

file

);

await API.post(

`/files/upload?category=${selected}&uploaded_by=${user.name}`,

formData

);

alert(

"✅ Uploaded"

);

setFile(

null

);

getFiles();

}

catch(err){

console.log(err);

}

};


const downloadFile=(id)=>{

window.open(

`http://127.0.0.1:8000/files/download/${id}`

);

};


const deleteFile=async(id)=>{

try{

await API.delete(

`/files/${id}`

);

alert(

"Deleted"

);

getFiles();

}

catch(err){

console.log(err);

}

};


return(

<div className="files-page">

<h1>

📁 File Management

</h1>

<div className="section-grid">

{

sections.map((item)=>(

<motion.div

key={item.category}

whileHover={{

scale:1.05

}}

className={

selected===item.category

?

"file-card active"

:

"file-card"

}

onClick={()=>

setSelected(

item.category

)

}

>

<h3>

{item.title}

</h3>

</motion.div>

))

}

</div>

<br/>

{

user.role==="admin"

&&

(

<div className="upload-box">

<input

type="file"

accept=".xlsx,.xls,.pdf"

onChange={(e)=>

setFile(

e.target.files[0]

)

}

/>

<button

onClick={uploadFile}

>

⬆ Upload

</button>

</div>

)

}

<br/>

<div className="files-list">

{

files.map((item)=>(

<motion.div

key={item.id}

initial={{

opacity:0,

y:20

}}

animate={{

opacity:1,

y:0

}}

className="single-file"

>

<h4>

📄 {item.title}

</h4>

<p>

👤 {item.uploaded_by}

</p>

<p>

🕒 {item.created_at}

</p>

<button

onClick={()=>

downloadFile(

item.id

)

}

>

⬇ Download

</button>

{

user.role==="admin"

&&

(

<button

onClick={()=>

deleteFile(

item.id

)

}

>

🗑 Delete

</button>

)

}

</motion.div>

))

}

</div>

</div>

);

}

export default Files;