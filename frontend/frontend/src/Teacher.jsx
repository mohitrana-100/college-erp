import { useEffect, useState } from "react";

import API from "./api";

function Teacher() {

  const [teachers, setTeachers] = useState([]);

  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({

    name: "",

    email: "",

    password: ""

  });

  const [editData, setEditData] = useState({

    name: ""

  });


  const getTeachers = async () => {

    try {

      const res = await API.get("/teachers");

      setTeachers(res.data);

    }

    catch (err) {

      console.log(err);

    }

  };


  useEffect(() => {

    getTeachers();

  }, []);


  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };


  const addTeacher = async () => {

    try {

      await API.post(

        "/add-teacher",

        {

          ...form,

          role:"teacher"

        }

      );

      alert("Teacher added");

      setForm({

        name:"",

        email:"",

        password:""

      });

      getTeachers();

    }

    catch(err){

      console.log(err);

    }

  };


  const startEdit = (teacher) => {

    setEditingId(

      teacher.id

    );

    setEditData({

      name:teacher.name

    });

  };


  const updateTeacher = async (id) => {

    try {

      await API.put(

        `/teachers/${id}`,

        editData

      );

      alert(

        "Teacher updated"

      );

      setEditingId(

        null

      );

      getTeachers();

    }

    catch(err){

      console.log(err);

    }

  };


  const deleteTeacher = async (id) => {

    try {

      await API.delete(

        `/teachers/${id}`

      );

      alert(

        "Teacher deleted"

      );

      getTeachers();

    }

    catch(err){

      console.log(err);

    }

  };


  const filteredTeachers =

    teachers.filter(

      (teacher)=>

      teacher.name

      .toLowerCase()

      .includes(

        search.toLowerCase()

      )

    );


  return (

    <div>

      <h2>

        👨‍🏫 Teacher Management

      </h2>


      <input

        name="name"

        placeholder="Teacher Name"

        value={form.name}

        onChange={handleChange}

      />


      <input

        name="email"

        placeholder="Email"

        value={form.email}

        onChange={handleChange}

      />


      <input

        name="password"

        placeholder="Password"

        value={form.password}

        onChange={handleChange}

      />


      <button

        onClick={addTeacher}

      >

        Add Teacher

      </button>


      <hr />


      <input

        placeholder="🔍 Search"

        value={search}

        onChange={(e)=>

          setSearch(

            e.target.value

          )

        }

      />


      <br /><br />


      {

        filteredTeachers.map(

          (teacher)=>(

            <div

              key={teacher.id}

            >

              {

                editingId===teacher.id

                ?

                (

                  <>

                    <input

                      value={editData.name}

                      onChange={(e)=>

                        setEditData({

                          ...editData,

                          name:e.target.value

                        })

                      }

                    />


                    <button

                      onClick={()=>

                        updateTeacher(

                          teacher.id

                        )

                      }

                    >

                      Save

                    </button>

                  </>

                )

                :

                (

                  <>

                    <p>

                      {teacher.name}

                      {" | "}

                      {teacher.email}

                    </p>


                    <button

                      onClick={()=>

                        startEdit(

                          teacher

                        )

                      }

                    >

                      ✏️ Edit

                    </button>


                    <button

                      onClick={()=>

                        deleteTeacher(

                          teacher.id

                        )

                      }

                    >

                      🗑️ Delete

                    </button>


                    <hr />

                  </>

                )

              }

            </div>

          )

        )

      }

    </div>

  );

}

export default Teacher;