import { useEffect, useState } from "react";

import API from "./api";

function Attendance() {

  const [records, setRecords] = useState([]);

  const [form, setForm] = useState({

    student_id: "",

    status: ""

  });


  const getAttendance = async () => {

    try {

      const res = await API.get(

        "/attendance"

      );

      setRecords(

        res.data

      );

    }

    catch (err) {

      console.log(err);

    }

  };


  useEffect(() => {

    getAttendance();

  }, []);


  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:

      e.target.value

    });

  };


  const markAttendance = async () => {

    try {

      const res = await API.post(

        "/attendance",

        {

          student_id:

          Number(

            form.student_id

          ),

          status:

          form.status

        }

      );

      alert(

        `${res.data.student}

         marked

         ${res.data.status}`

      );

      setForm({

        student_id:"",

        status:""

      });

      getAttendance();

    }

    catch (err) {

      console.log(err);

      alert(

        err.response?.data?.detail ||

        "Error"

      );

    }

  };


  const deleteAttendance = async (id) => {

    try {

      await API.delete(

        `/attendance/${id}`

      );

      alert(

        "Attendance deleted"

      );

      getAttendance();

    }

    catch (err) {

      console.log(err);

    }

  };


  return (

    <div>

      <h2>

        📋 Attendance Management

      </h2>


      <input

        name="student_id"

        placeholder="Student ID"

        value={form.student_id}

        onChange={handleChange}

      />


      <br /><br />


      <input

        name="status"

        placeholder="present / absent"

        value={form.status}

        onChange={handleChange}

      />


      <br /><br />


      <button

        onClick={markAttendance}

      >

        Mark Attendance

      </button>


      <hr />


      {

        records.map(

          (record)=>(

            <div

              key={record.id}

            >

              <p>

                Student :

                {" "}

                {record.student_name}

                {" | "}

                Subject :

                {" "}

                {record.subject}

                {" | "}

                Status :

                {" "}

                {record.status}

              </p>


              <button

                onClick={()=>

                  deleteAttendance(

                    record.id

                  )

                }

              >

                🗑️ Delete

              </button>


              <hr />

            </div>

          )

        )

      }

    </div>

  );

}

export default Attendance;