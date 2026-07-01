import { useEffect, useState } from "react";
import Auth from "./Auth";
import "./App.css";

import Signup from "./Signup";

import Login from "./Login";

import Dashboard from "./Dashboard";


function App() {

  const [user, setUser] = useState(null);

  const [dark, setDark] = useState(false);


  useEffect(() => {

    const token = localStorage.getItem(

      "token"

    );


    const savedUser = localStorage.getItem(

      "user"

    );


    if (

      token &&

      savedUser

    ) {

      setUser(

        JSON.parse(

          savedUser

        )

      );

    }

  }, []);


  return (

    <div className={dark ? "dark app-wrapper" : "app-wrapper"}>
      <button

        onClick={() =>

          setDark(

            !dark

          )

        }

      >

        {

          dark

          ?

          "☀️ Light"

          :

          "🌙 Dark"

        }

      </button>


      {

        user

        ?

        <Dashboard

          user={user}

          setUser={setUser}

        />

        :

        <>

         <Auth

setUser={setUser}

/>

        </>

      }

    </div>

  );

}

export default App;