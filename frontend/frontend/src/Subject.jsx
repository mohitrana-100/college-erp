import { useEffect, useState } from "react";

import API from "./api";

function Subject() {

  const [name, setName] = useState("");

  const [subjects, setSubjects] = useState([]);

  const [search, setSearch] = useState("");


  const getSubjects = async () => {

    try {

      const res = await API.get(

        "/subjects"

      );

      setSubjects(

        res.data

      );

    }

    catch (err) {

      console.log(err);

    }

  };


  useEffect(() => {

    getSubjects();

  }, []);


  const addSubject = async () => {

    if (name === "") {

      alert(

        "Enter subject"

      );

      return;

    }


    try {

      await API.post(

        "/add-subject",

        {

          name

        }

      );


      alert(

        "Subject added"

      );


      setName("");

      getSubjects();

    }

    catch (err) {

      console.log(err);

    }

  };


  const deleteSubject = async (id) => {

    try {

      await API.delete(

        `/subjects/${id}`

      );


      alert(

        "Subject deleted"

      );


      getSubjects();

    }

    catch (err) {

      console.log(err);

    }

  };


  const filteredSubjects =

    subjects.filter(

      (item) =>

        item.name

          .toLowerCase()

          .includes(

            search.toLowerCase()

          )

    );


  return (

    <div>

      <h2>

        📚 Subject Management

      </h2>


      <input

        placeholder="Subject Name"

        value={name}

        onChange={(e) =>

          setName(

            e.target.value

          )

        }

      />


      <button

        onClick={addSubject}

      >

        Add Subject

      </button>


      <br /><br />


      <input

        placeholder="🔍 Search Subject"

        value={search}

        onChange={(e) =>

          setSearch(

            e.target.value

          )

        }

      />


      <hr />


      {

        filteredSubjects.map(

          (item) => (

            <div

              key={item.id}

            >

              <p>

                {item.name}

              </p>


              <button

                onClick={() =>

                  deleteSubject(

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

export default Subject;