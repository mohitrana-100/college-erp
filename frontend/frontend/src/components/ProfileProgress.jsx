function ProfileProgress({user}){

let completed=0;

let total=5;


if(user.img){

completed++;

}


if(user.email){

completed++;

}


if(user.phone){

completed++;

}


if(user.address){

completed++;

}


if(user.bio){

completed++;

}


const percent=Math.floor(

(completed/total)*100

);


return(

<div className="card">

<h2>

📈 Profile Completion

</h2>


<div className="progress-bar">

<div

className="progress-fill"

style={{width:`${percent}%`}}

>

</div>

</div>


<h3>

{percent}%

</h3>

</div>

);

}

export default ProfileProgress;