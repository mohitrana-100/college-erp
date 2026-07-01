function Navbar() {

  return (

    <div
      style={{

        display: "flex",

        justifyContent: "space-around",

        padding: "15px",

        backgroundColor: "#1976d2",

        color: "white",

        fontWeight: "bold"

      }}
    >

      <div>🏠 Dashboard</div>

      <div>👨‍🎓 Students</div>

      <div>👨‍🏫 Teachers</div>

      <div>📅 Timetable</div>

      <div>📝 Assignments</div>

      <div>📊 Marks</div>

      <div>💰 Fees</div>

      <div>📢 Notices</div>

    </div>

  );

}

export default Navbar;