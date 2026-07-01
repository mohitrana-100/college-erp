import { useState } from "react";

function Settings() {

const [

darkMode,

setDarkMode

]

=

useState(

localStorage.getItem(

"dark"

)==="true"

);


const [

notifications,

setNotifications

]

=

useState(

localStorage.getItem(

"notifications"

)!=="false"

);


const [

language,

setLanguage

]

=

useState(

localStorage.getItem(

"language"

)

||

"English"

);



const saveSettings=()=>{


localStorage.setItem(

"dark",

darkMode

);


localStorage.setItem(

"notifications",

notifications

);


localStorage.setItem(

"language",

language

);


alert(

"Settings saved"

);

};



return(

<div>

<h2>

⚙️ Settings

</h2>


<br/>


<label>

🌙 Dark Mode

</label>


<input

type="checkbox"

checked={darkMode}

onChange={()=>

setDarkMode(

!darkMode

)

}

/>


<br/>

<br/>


<label>

🔔 Notifications

</label>


<input

type="checkbox"

checked={notifications}

onChange={()=>

setNotifications(

!notifications

)

}

/>


<br/>

<br/>


<label>

🌐 Language

</label>


<br/>

<br/>


<select

value={language}

onChange={(e)=>

setLanguage(

e.target.value

)

}

>

<option>

English

</option>


<option>

Hindi

</option>


<option>

French

</option>


</select>


<br/>

<br/>


<button

onClick={saveSettings}

>

💾 Save Settings

</button>

</div>

);

}

export default Settings;