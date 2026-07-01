import Student from "./Student";

import Teacher from "./Teacher";

import Attendance from "./Attendance";

import Notice from "./Notice";

import Subject from "./Subject";

import Marks from "./Marks";

import Timetable from "./Timetable";

import Fees from "./Fees";

import RealStatistics from "./RealStatistics";
import Charts from "./Charts";
import logo from "./assets/logo.png";
import Report from "./Report";
import ExcelReport from "./ExcelReport";

import About from "./About";


function Dashboard({

  user,

  setUser

}) {

  const logout = () => {

    localStorage.removeItem(

      "token"

    );



    localStorage.removeItem(

      "user"

    );



    setUser(

      null

    );

  };


  return (

    <div>

      <div className="navbar">
        <div className="logo-section">

<img

src={logo}

alt="logo"

/>
</div>

        <h1>

          🎓 College ERP

        </h1>


        <div>

          👋 Welcome

          {" "}

          {user.name}

          {" | "}

          {user.role}

        </div>


        <button

          onClick={logout}

        >

          🚪 Logout

        </button>

      </div>


      <div className="dashboard-grid">

        <div className="card">

          <RealStatistics />

        </div>
        <div className="card">
            <Charts />

        </div>
        <div className="card">

  <ExcelReport />

</div>


<div className="card">

  <About />

</div>


        <div className="card">

          <Student />

        </div>


        <div className="card">

          <Teacher />

        </div>


        <div className="card">

          <Attendance />

        </div>


        <div className="card">

          <Notice />

        </div>


        <div className="card">

          <Subject />

        </div>


        <div className="card">

          <Marks />

        </div>


        <div className="card">

          <Timetable />

        </div>


        <div className="card">

          <Fees />

        </div>


        <div className="card">

          <Report />
        

        </div>
        <div className="footer">

Developed by Mohit Rana

<br/>

B.Tech College ERP Project

2026

</div>

      </div>

    </div>

  );

}

export default Dashboard;