// components/RecentFiles.jsx

import {useEffect,useState} from "react";
import API from "../api";

function RecentFiles(){

const [files,setFiles]=useState([]);

useEffect(()=>{

getFiles();

},[]);

const getFiles=async()=>{

try{

const res=await API.get(
"/files"
);

setFiles(
res.data.slice(0,5)
);

}
catch(err){

console.log(err);

}

};

return(

<div className="widget-card">

<h3>
📁 Recent Files
</h3>

{
files.map(file=>(

<div key={file.id}>

📄 {file.file_name}

</div>

))
}

</div>

);

}

export default RecentFiles;