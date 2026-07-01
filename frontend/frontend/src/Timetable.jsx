import { useEffect, useState } from "react";

import API from "./api";

function Timetable() {

  const [form, setForm] = useState({

    day: "",

    subject: "",

    time: ""

  });

  const [timetable, setTimetable] = useState([]);

  const [search, setSearch] = useState("");


  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:

      e.target.value

    });

  };


  const getTimetable = async () => {

    try {

      const res = await API.get(

        "/timetable"

      );

      setTimetable(

        res.data

      );

    }

    catch(err){

      console.log(err);

    }

  };


  useEffect(() => {

    getTimetable();

  }, []);


  const addTimetable = async () => {

    if(

      form.day === "" ||

      form.subject === "" ||

      form.time === ""

    ){

      alert(

        "Fill all fields"

      );

      return;

    }


    try{

      await API.post(

        "/add-timetable",

        form

      );


      alert(

        "Timetable added"

      );


      setForm({

        day: "",

        subject: "",

        time: ""

      });


      getTimetable();

    }

    catch(err){

      console.log(err);

    }

  };


  const deleteTimetable = async (

    id

  ) => {

    try{

      await API.delete(

        `/timetable/${id}`

      );


      alert(

        "Deleted"

      );


      getTimetable();

    }

    catch(err){

      console.log(err);

    }

  };


  const filteredData =

    timetable.filter(

      (item)=>

      item.subject

      .toLowerCase()

      .includes(

        search

        .toLowerCase()

      )

    );


  return (

    <div>

      <h2>

        🗓 Timetable

      </h2>


      <input

        name="day"

        placeholder="Day"

        value={form.day}

        onChange={handleChange}

      />


      <br /><br />


      <input

        name="subject"

        placeholder="Subject"

        value={form.subject}

        onChange={handleChange}

      />


      <br /><br />


      <input

        name="time"

        placeholder="Time"

        value={form.time}

        onChange={handleChange}

      />


      <br /><br />


      <button

        onClick={addTimetable}

      >

        Add Timetable

      </button>


      <hr />


      <input

        placeholder=

        "🔍 Search Subject"

        value={search}

        onChange={(e)=>

          setSearch(

            e.target.value

          )

        }

      />


      <br /><br />


      {

        filteredData.map(

          (item)=>(

            <div

              key={item.id}

            >

              <p>

                {item.day}

                {" | "}

                {item.subject}

                {" | "}

                {item.time}

              </p>


              <button

                onClick={()=>

                  deleteTimetable(

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

export default Timetable;