import { useEffect, useState } from "react";

import API from "./api";

function Fees() {

  const [form, setForm] = useState({

    student_name: "",

    amount: "",

    status: ""

  });

  const [fees, setFees] = useState([]);

  const [search, setSearch] = useState("");


  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:

      e.target.value

    });

  };


  const getFees = async () => {

    try {

      const res = await API.get(

        "/fees"

      );

      setFees(

        res.data

      );

    }

    catch(err){

      console.log(err);

    }

  };


  useEffect(() => {

    getFees();

  }, []);


  const addFee = async () => {

    if(

      form.student_name === "" ||

      form.amount === "" ||

      form.status === ""

    ){

      alert(

        "Fill all fields"

      );

      return;

    }


    try{

      await API.post(

        "/add-fee",

        {

          student_name:

          form.student_name,

          amount:

          Number(

            form.amount

          ),

          status:

          form.status

        }

      );


      alert(

        "Fee added"

      );


      setForm({

        student_name: "",

        amount: "",

        status: ""

      });


      getFees();

    }

    catch(err){

      console.log(err);

    }

  };


  const markPaid = async (

    id

  ) => {

    try{

      await API.put(

        `/fees/${id}`

      );


      alert(

        "Marked Paid"

      );


      getFees();

    }

    catch(err){

      console.log(err);

    }

  };


  const filteredFees =

    fees.filter(

      (item)=>

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

        💰 Fees Management

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

        name="amount"

        placeholder=

        "Amount"

        value={

          form.amount

        }

        onChange={

          handleChange

        }

      />


      <br /><br />


      <input

        name="status"

        placeholder=

        "Pending"

        value={

          form.status

        }

        onChange={

          handleChange

        }

      />


      <br /><br />


      <button

        onClick={

          addFee

        }

      >

        Add Fee

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

        filteredFees.map(

          (item)=>(

            <div

              key={item.id}

            >

              <p>

                {item.student_name}

                {" | "}

                ₹{item.amount}

                {" | "}

                {item.status}

              </p>


              {

                item.status

                !==

                "Paid"

                &&

                <button

                  onClick={()=>

                    markPaid(

                      item.id

                    )

                  }

                >

                  ✅ Mark Paid

                </button>

              }


              <hr />

            </div>

          )

        )

      }

    </div>

  );

}

export default Fees;