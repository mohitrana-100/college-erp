function DashboardCards({ data }) {

  const cards = [
    {
      title: "Students",
      value: data.students,
      icon: "🎓"
    },
    {
      title: "Teachers",
      value: data.teachers,
      icon: "👨‍🏫"
    },
    {
      title: "Notices",
      value: data.notices,
      icon: "📢"
    },
    {
      title: "Files",
      value: data.files,
      icon: "📁"
    }
  ];

  return (

    <div className="cards-grid">

      {
        cards.map((card,index)=>(

          <div
            key={index}
            className="modern-card"
          >

            <div className="card-icon">
              {card.icon}
            </div>

            <h2>
              {card.value}
            </h2>

            <p>
              {card.title}
            </p>

          </div>

        ))
      }

    </div>

  );
}

export default DashboardCards;