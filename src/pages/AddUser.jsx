import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddUser.css";
import firebaseDB from "../Firebase";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  contact: "",
  status: "",
};
function AddUser() {
  const [state, setState] = useState(initialState);
  const [data, setdata] = useState({});
  const { name, email, contact, status } = state;

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    //! UseEffect
    firebaseDB.child("Contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setdata({ ...snapshot.val() });
      } else {
        setdata({});
      }
    });
    return () => {
      setdata({});
    };
  }, [id]);

  useEffect(() => {
    //! UseEffect
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }
    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact || !status) {
      toast.error("please Provide value In each Input Field");
    } else {
      if(!id){

        firebaseDB.child("Contacts").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("User Added Successfully");
            setTimeout(() => {
              navigate("/");
            }, 500);
          }
        });
      }
      else{
        firebaseDB.child("Contacts").child(id).update(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("User Updated Successfully");
            setTimeout(() => {
              navigate("/");
            }, 500);
          }
          
        });  
      }
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="name">Email</label>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          value={email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="name">Contact</label>

        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Your Contact Number ...."
          value={contact || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="name">Status</label>
        <input
          type="text"
          id="status"
          name="status"
          placeholder="Your Status..."
          value={status || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ?"Update":"Add User"} />
      </form>
    </div>
  );
}

export default AddUser;
