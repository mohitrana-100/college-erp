function ExcelReport() {

  const downloadExcel = () => {

    window.open(

      "http://127.0.0.1:8000/download-excel"

    );

  };


  return (

    <div>

      <h2>

        📥 Excel Report

      </h2>


      <button

        onClick={downloadExcel}

      >

        Download Excel

      </button>

    </div>

  );

}

export default ExcelReport;