import { useEffect, useState } from "react";

import API from "./api";

import avatar from "./assets/logo2.png";
import ProfileProgress from "./components/ProfileProgress";

function Profile({ user }) {
    <ProfileProgress user={user}/>

const [

profileImage,

setProfileImage

]

=

useState(

avatar

);


const [

profile,

setProfile

]

=

useState({

phone:"",

address:"",

dob:"",

bio:""

});


const hiddenEmail=

user?.email

?

user.email.slice(

0,

4

)

+

"******"

+

user.email.slice(

user.email.indexOf("@")

)

:

"Email unavailable";


useEffect(()=>{

if(

user?.email

){

getProfile();

}

},[user]);


const getProfile=async()=>{

try{


const res=

await API.get(

`/profile/${user.email}`

);


setProfile({

phone:

res.data.phone || "",

address:

res.data.address || "",

dob:

res.data.dob || "",

bio:

res.data.bio || ""

});


if(

res.data.image

){

setProfileImage(

res.data.image

);

}


}

catch(err){

console.log(

err

);

}

};


const saveProfile=async()=>{


if(

!user?.email

){

alert(

"Please login again"

);

return;

}


try{


await API.put(

`/profile/${user.email}`,

profile

);


alert(

"✅ Profile saved"

);


}

catch(err){


console.log(

err

);


alert(

"❌ Save failed"

);

}

};


const handleImage=(e)=>{


const file=

e.target.files[0];


if(!file)

return;


const reader=

new FileReader();


reader.onloadend=()=>{


setProfileImage(

reader.result

);


};


reader.readAsDataURL(

file

);


};


return(

<div>


<h2>

👤 My Profile

</h2>


<hr/>


<img

src={profileImage}

alt="profile"

className="profile-image"

/>


<br/>

<br/>


<input

type="file"

accept="image/*"

onChange={handleImage}

/>


<hr/>


<p>

Name :

{" "}

{user?.name}

</p>


<p>

Email :

{" "}

{hiddenEmail}

</p>


<p>

Role :

{" "}

{user?.role}

</p>


<hr/>


<input

placeholder="Phone"

value={profile.phone}

onChange={(e)=>

setProfile({

...profile,

phone:e.target.value

})

}

/>


<br/>

<br/>


<input

placeholder="Address"

value={profile.address}

onChange={(e)=>

setProfile({

...profile,

address:e.target.value

})

}

/>


<br/>

<br/>


<input

type="date"

value={profile.dob}

onChange={(e)=>

setProfile({

...profile,

dob:e.target.value

})

}

/>


<br/>

<br/>


<textarea

placeholder="Bio"

value={profile.bio}

onChange={(e)=>

setProfile({

...profile,

bio:e.target.value

})

}

/>


<br/>

<br/>


<button

onClick={saveProfile}

>

💾 Save Profile

</button>


</div>

);

}


export default Profile;