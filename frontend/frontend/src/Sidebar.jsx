function Sidebar({

  selected,

  setSelected,

  logout

}) {

  const menus = [

    "Dashboard",

    "Students",

    "Teachers",

    "Attendance",

    "Subjects",

    "Marks",

    "Fees",

    "Notices",

    "Analytics",

    "Reports",

    "Settings"

  ];


  return (
    

    <div className="sidebar">
        <div className="sidebar-profile">

<img
src={user.img || "/default.png"}
alt=""
/>

<h3>{user.name}</h3>

<p>{user.role}</p>

</div>

      <h2>

        🎓 ERP

      </h2>


      {

        menus.map(

          (item)=>(

            <button

              key={item}

              className={

                selected===item

                ?

                "active"

                :

                ""

              }

              onClick={()=>

                setSelected(

                  item

                )

              }

            >

              {item}

            </button>

          )

        )

      }


      <button

        onClick={logout}

      >

        🚪 Logout

      </button>

    </div>

  );

}


export default Sidebar;