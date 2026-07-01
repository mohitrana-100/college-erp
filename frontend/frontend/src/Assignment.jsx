import { useEffect, useState } from "react";

import API from "./api";

function Assignment() {

  const [form, setForm] = useState({

    title: "",

    subject: ""

  });

  const [assignments, setAssignments] = useState([]);


  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };


  const getAssignments = async () => {

    try {

      const res = await API.get("/assignments");

      setAssignments(res.data);

    }

    catch(err){

      console.log(err);

    }

  };


  useEffect(() => {

    getAssignments();

  }, []);


  const addAssignment = async () => {

    try {

      const res = await API.post(

        "/add-assignment",

        form

      );

      alert(

        res.data.message

      );

      setForm({

        title: "",

        subject: ""

      });

      getAssignments();

    }

    catch(err){

      console.log(err);

    }

  };


  const deleteAssignment = async (id) => {

    try {

      await API.delete(

        `/assignments/${id}`

      );

      getAssignments();

    }

    catch(err){

      console.log(err);

    }

  };


  return (

    <div>

      <h2>Assignment Management</h2>


      <input

        name="title"

        placeholder="Assignment Title"

        value={form.title}

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


      <button onClick={addAssignment}>

        Add Assignment

      </button>


      <hr />


      {assignments.map((item) => (

        <div key={item.id}>

          <p>

            {item.title}

            {" | "}

            {item.subject}

          </p>

          <button

            onClick={() =>

              deleteAssignment(item.id)

            }

          >

            Delete

          </button>

          <hr />

        </div>

      ))}

    </div>

  );

}

export default Assignment;