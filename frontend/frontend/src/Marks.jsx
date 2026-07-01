import { useEffect, useState } from "react";

import API from "./api";

function Marks() {

  const [form, setForm] = useState({

    student_name: "",

    subject: "",

    marks: ""

  });


  const [marksData, setMarksData] = useState([]);

  const [search, setSearch] = useState("");


  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:

      e.target.value

    });

  };


  const getMarks = async () => {

    try {

      const res = await API.get(

        "/marks"

      );

      setMarksData(

        res.data

      );

    }

    catch (err) {

      console.log(err);

    }

  };


  useEffect(() => {

    getMarks();

  }, []);


  const addMarks = async () => {

    if (

      form.student_name === "" ||

      form.subject === "" ||

      form.marks === ""

    ) {

      alert(

        "Fill all fields"

      );

      return;

    }


    try {

      await API.post(

        "/add-marks",

        {

          student_name:

          form.student_name,

          subject:

          form.subject,

          marks:

          Number(

            form.marks

          )

        }

      );


      alert(

        "Marks added"

      );


      setForm({

        student_name: "",

        subject: "",

        marks: ""

      });


      getMarks();

    }

    catch (err) {

      console.log(err);

    }

  };


  const deleteMarks = async (

    id

  ) => {

    try {

      await API.delete(

        `/marks/${id}`

      );


      alert(

        "Marks deleted"

      );


      getMarks();

    }

    catch (err) {

      console.log(err);

    }

  };


  const filteredMarks =

    marksData.filter(

      (item) =>

        item.student_name

        .toLowerCase()

        .includes(

          search

          .toLowerCase()

        )

    );


  return (

    <div>

      <h2>

        📝 Marks Management

      </h2>


      <input

        name="student_name"

        placeholder=

        "Student Name"

        value={

          form.student_name

        }

        onChange={

          handleChange

        }

      />


      <br /><br />


      <input

        name="subject"

        placeholder=

        "Subject"

        value={

          form.subject

        }

        onChange={

          handleChange

        }

      />


      <br /><br />


      <input

        name="marks"

        placeholder=

        "Marks"

        value={

          form.marks

        }

        onChange={

          handleChange

        }

      />


      <br /><br />


      <button

        onClick={

          addMarks

        }

      >

        Add Marks

      </button>


      <hr />


      <input

        placeholder=

        "🔍 Search Student"

        value={search}

        onChange={(e)=>

          setSearch(

            e.target.value

          )

        }

      />


      <br /><br />


      {

        filteredMarks.map(

          (item)=>(

            <div

              key={item.id}

            >

              <p>

                {item.student_name}

                {" | "}

                {item.subject}

                {" | "}

                {item.marks}

              </p>


              <button

                onClick={()=>

                  deleteMarks(

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

export default Marks;