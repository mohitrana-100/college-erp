import {

useState

}

from "react";


import API from "./api";


function ChangePassword({

user

}){


const [

form,

setForm

]

=

useState({

old_password:"",

new_password:"",

confirm_password:""

});



const changePassword=

async()=>{


if(

form.new_password

!==

form.confirm_password

){

alert(

"Passwords do not match"

);

return;

}


try{


await API.put(

"/change-password",

{

email:user.email,

old_password:

form.old_password,

new_password:

form.new_password

}

);


alert(

"Password updated"

);


setForm({

old_password:"",

new_password:"",

confirm_password:""

});

}

catch(err){

alert(

"Wrong old password"

);

}

};



return(

<div>

<h2>

🔒 Change Password

</h2>


<input

type="password"

placeholder="Old Password"

value={form.old_password}

onChange={(e)=>

setForm({

...form,

old_password:

e.target.value

})

}

/>


<br/><br/>


<input

type="password"

placeholder="New Password"

value={form.new_password}

onChange={(e)=>

setForm({

...form,

new_password:

e.target.value

})

}

/>


<br/><br/>


<input

type="password"

placeholder="Confirm Password"

value={form.confirm_password}

onChange={(e)=>

setForm({

...form,

confirm_password:

e.target.value

})

}

/>


<br/><br/>


<button

onClick={changePassword}

>

Update Password

</button>

</div>

);

}


export default ChangePassword;