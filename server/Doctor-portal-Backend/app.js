const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");

app.use(express.json()); // req.body
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "*",
  })
);

// Get all Data

app.get("/get", async (req, res, next) => {
  try {
    const getsData = await pool.query("select * from patient_detail");
    res.status(200).send(getsData.rows);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

// Get Data

app.get("/get/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const getData = await pool.query(
      "select * from patient_detail where id = $1",
      [id]
    );
    res.status(200).send(getData.rows);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

// Add Data

app.post("/post", async (req, res, next) => {
  const { first_name, last_name, email, address, contact_no, city, state } =
    req.body;
  try {
    const postData = await pool.query(
      "insert into patient_detail (first_name, last_name, email, address,contact_no,city,state) values($1,$2,$3,$4,$5,$6,$7) returning *",
      [first_name, last_name, email, address, contact_no, city, state]
    );
    res.status(200).send(postData.rows);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

app.post("/user/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const postData = await pool.query(
      "select * from user_detail where email='" +
        email +
        "' and password='" +
        password +
        "'"
    );
    res.status(200).send(postData.rows);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

app.post("/user/post", async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const postData = await pool.query(
      "insert into user_detail (first_name, last_name, email, password) values($1,$2,$3,$4) returning *",
      [first_name, last_name, email, password]
    );
    res.status(200).send(postData.rows);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});
// Update Data

app.put("/put/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, address, contact_no, city, state } =
    req.body;
  try {
    const updateData = await pool.query(
      "update patient_detail set first_name=$1, last_name=$2, email=$3, address=$4,contact_no=$5,city=$6,state=$7 where id=$8",
      [first_name, last_name, email, address, contact_no, city, state]
    );
    res.status(200).send("patient_detail was updated !");
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

// Delete Data

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteData = await pool.query(
      "delete from patient_detail where id =  $1",
      [id]
    );
    if (deleteData) {
      res.status(200).send("Data was Deleted !");
    } else {
      res.status(400).send("somthing want wrong to delete record");
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

module.exports = app;
