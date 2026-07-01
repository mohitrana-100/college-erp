import { useEffect, useState } from "react";

import API from "./api";

function Statistics() {

  const [stats, setStats] = useState({

    students: 0,

    teachers: 0,

    subjects: 0

  });

  const getStats = async () => {

    try {

      const students = await API.get("/students");

      const teachers = await API.get("/teachers");

      const subjects = await API.get("/subjects");

      setStats({

        students: students.data.length,

        teachers: teachers.data.length,

        subjects: subjects.data.length

      });

    }

    catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    getStats();

  }, []);

  return (

    <div>

      <h2>

        Statistics Dashboard

      </h2>

      <h3>

        Total Students :

        {stats.students}

      </h3>

      <h3>

        Total Teachers :

        {stats.teachers}

      </h3>

      <h3>

        Total Subjects :

        {stats.subjects}

      </h3>

      <h3>

        Today's Date :

        {

          new Date()

          .toLocaleDateString()

        }

      </h3>

    </div>

  );

}

export default Statistics;