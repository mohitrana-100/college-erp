function MiniCards({data}){

return(

<div className="mini-card-container">

<div className="mini-card">

👨‍🎓

<h3>

{data.students}

</h3>

<p>

Students

</p>

</div>

<div className="mini-card">

👨‍🏫

<h3>

{data.teachers}

</h3>

<p>

Teachers

</p>

</div>

<div className="mini-card">

🟢

<h3>

{data.attendance}

</h3>

<p>

Attendance

</p>

</div>

<div className="mini-card">

📂

<h3>

{data.files}

</h3>

<p>

Files

</p>

</div>

</div>

);

}

export default MiniCards;