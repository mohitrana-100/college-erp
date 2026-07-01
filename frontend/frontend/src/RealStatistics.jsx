import { useEffect, useState } from "react";

import API from "./api";


function RealStatistics() {

  const [data, setData] = useState({

    students: 0,

    teachers: 0,

    notices: 0,

    assignments: 0,

    fees: 0

  });


  const getStatistics = async () => {

    try {

      const res = await API.get(

        "/statistics"

      );

      setData(

        res.data

      );

    }

    catch (err) {

      console.log(

        err

      );

    }

  };


  useEffect(() => {

    getStatistics();

  }, []);


  return (

    <div>

      <h2>

        📊 Dashboard Statistics

      </h2>


      <div>

        <p>

          👨‍🎓 Students :

          {data.students}

        </p>


        <p>

          👨‍🏫 Teachers :

          {data.teachers}

        </p>


        <p>

          📢 Notices :

          {data.notices}

        </p>


        <p>

          📝 Assignments :

          {data.assignments}

        </p>


        <p>

          💰 Pending Fees :

          {data.fees}

        </p>

      </div>

    </div>

  );

}

export default RealStatistics;