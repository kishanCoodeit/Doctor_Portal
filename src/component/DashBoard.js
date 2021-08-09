import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./NavBar";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  FormLabel,
} from "@material-ui/core";

const useStyles = makeStyles({
  lable: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "40px",
  },
  root: {
    textalign: "center",
    margin: "30px",
  },
  container: {
    maxHeight: 1000,
  },
  popup: {
    display: "grid",
    padding: "40px",
  },
  tablecell: { textAlign: "center" },
});

const columns = [
  { id: "First_Name", label: "First_Name", minWidth: 150 },
  {
    id: "Last_Name",
    label: "Last_Name",
    minWidth: 170,
  },
  {
    id: "email",
    label: "email",
    minWidth: 170,
  },
  {
    id: "address",
    label: "address",
    minWidth: 170,
  },
  {
    id: "contact_no",
    label: "contact_no",
    minWidth: 170,
  },
  {
    id: "city",
    label: "city",
    minWidth: 170,
  },
  {
    id: "state",
    label: "state",
    minWidth: 170,
  },
  {
    id: "Delete",
    label: "Delete",
    minWidth: 170,
  },
];

const DashBoard = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [getData, setgetData] = useState([]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    contact_no: "",
    city: "",
    state: "",
  });

  const userchange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log(form);

  //CALL GET API

  const getApi = () => {
    fetch("http://localhost:3009/get")
      .then((res) => res.json())
      .then((res) => setgetData(res))
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (id) => {
    console.log("id", id);
    setOpen(false);
    fetch("http://localhost:3009/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((response) => console.log("response", response));

    getApi();
  };

  const hendleDelete = (id) => {
    //CALL DELETE API

    fetch(`http://localhost:3009/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((ress) => {
        console.log("ress", ress);
      })
      .catch((e) => {
        const deleteData = getData.filter((res) => res.id !== id);
        setgetData([...deleteData]);
      });
  };

  const onChange = (e) => {
    console.log(e.target.value);
    if (e.target.value.length === 0) {
      getApi();
    } else {
      const result = getData.filter((data) => {
        return data.first_name.includes(e.target.value.trim());
      });
      setgetData(result);
    }
  };

  return (
    <div>
      <NavBar onChange={onChange} />
      <div className={classes.lable}>
        <FormLabel>Patient Detail</FormLabel>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add New Patient Detail
        </Button>
      </div>
      <div className={classes.root}>
        <Paper>
          <Dialog
            className={classes.popup}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Enter New Patient Detail"}
            </DialogTitle>
            <hr />
            <form className={classes.popup}>
              <TextField
                style={{ width: "400px" }}
                id="standard-basic"
                name="first_name"
                label="First Name"
                value={form.first_name}
                onChange={userchange}
              />
              <TextField
                id="standard-basic"
                name="last_name"
                label="Last Name"
                value={form.last_name}
                onChange={userchange}
              />
              <TextField
                id="standard-basic"
                name="email"
                label="Email"
                value={form.email}
                onChange={userchange}
              />
              <TextField
                id="standard-basic"
                name="address"
                label="Address"
                value={form.address}
                onChange={userchange}
              />
              <TextField
                id="standard-basic"
                name="contact_no"
                label="Contact No"
                value={form.contact_no}
                onChange={userchange}
              />
              <TextField
                id="standard-basic"
                name="city"
                label="City"
                value={form.city}
                onChange={userchange}
              />
              <TextField
                id="standard-basic"
                name="state"
                label="State"
                value={form.state}
                onChange={userchange}
              />
            </form>
            <DialogActions>
              <Button onClick={handleSubmit} color="primary" autoFocus>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableRow>
                {columns.map((column) => (
                  <TableCell className={classes.tablecell}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
              <TableBody>
                {getData.map((data, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className={classes.tablecell}>
                        {data.first_name}
                      </TableCell>
                      <TableCell className={classes.tablecell}>
                        {data.last_name}
                      </TableCell>
                      <TableCell className={classes.tablecell}>
                        {data.email}
                      </TableCell>
                      <TableCell className={classes.tablecell}>
                        {data.address}
                      </TableCell>
                      <TableCell className={classes.tablecell}>
                        {data.contact_no}
                      </TableCell>
                      <TableCell className={classes.tablecell}>
                        {data.city}
                      </TableCell>
                      <TableCell className={classes.tablecell}>
                        {data.state}
                      </TableCell>
                      <TableCell className={classes.tablecell}>
                        <Button
                          color="primary"
                          onClick={() => hendleDelete(data.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
};

export default DashBoard;
