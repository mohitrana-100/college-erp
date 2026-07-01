import API from "./api";

function Report() {

  const downloadReport = () => {

    window.open(

      "http://127.0.0.1:8000/download-report"

    );

  };


  return (

    <div>

      <h2>

        📄 Download Report

      </h2>


      <button

        onClick={downloadReport}

      >

        Download PDF

      </button>

    </div>

  );

}

export default Report;