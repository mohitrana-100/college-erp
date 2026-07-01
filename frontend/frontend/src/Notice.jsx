import { useEffect, useState } from "react";

import API from "./api";

function Notice() {

  const [message, setMessage] = useState("");

  const [notices, setNotices] = useState([]);

  const [search, setSearch] = useState("");


  const getNotices = async () => {

    try {

      const res = await API.get(

        "/notices"

      );

      setNotices(

        res.data

      );

    }

    catch(err){

      console.log(err);

    }

  };


  useEffect(() => {

    getNotices();

  }, []);


  const addNotice = async () => {

    if(message===""){

      alert(

        "Write a notice"

      );

      return;

    }


    try{

      await API.post(

        "/add-notice",

        {

          message

        }

      );


      alert(

        "Notice added"

      );


      setMessage("");

      getNotices();

    }

    catch(err){

      console.log(err);

    }

  };


  const deleteNotice = async (id) => {

    const ok = window.confirm(

      "Delete notice?"

    );


    if(!ok){

      return;

    }


    try{

      await API.delete(

        `/notices/${id}`

      );


      alert(

        "Notice deleted"

      );


      getNotices();

    }

    catch(err){

      console.log(err);

    }

  };


  const filteredNotices =

    notices.filter(

      (item)=>

      item.message

      .toLowerCase()

      .includes(

        search

        .toLowerCase()

      )

    );


  return (

    <div>

      <h2>

        📢 Notice Board

      </h2>


      <input

        placeholder=

        "Write Notice"

        value={message}

        onChange={(e)=>

          setMessage(

            e.target.value

          )

        }

      />


      <button

        onClick={addNotice}

      >

        Add Notice

      </button>


      <br /><br />


      <input

        placeholder=

        "🔍 Search Notice"

        value={search}

        onChange={(e)=>

          setSearch(

            e.target.value

          )

        }

      />


      <hr />


      {

        filteredNotices.map(

          (item)=>(

            <div

              key={item.id}

            >

              <p>

                {item.message}

              </p>


              <button

                onClick={()=>

                  deleteNotice(

                    item.id

                  )

                }

              >

                🗑 Delete

              </button>


              <hr />

            </div>

          )

        )

      }

    </div>

  );

}

export default Notice;