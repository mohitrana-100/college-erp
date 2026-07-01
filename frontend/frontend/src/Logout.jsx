function Logout({ setUser }) {

  const handleLogout = () => {

    setUser(null);

  };


  return (

    <button

      onClick={handleLogout}

      style={{

        padding: "10px",

        marginBottom: "20px"

      }}

    >

      🔐 Logout

    </button>

  );

}

export default Logout;