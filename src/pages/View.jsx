import React, { useState, useEffect } from "react";
import firebaseDB from "../Firebase";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./View.css";

function View() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    firebaseDB
      .child(`Contacts/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser({ ...snapshot.val() });
        } else {
          setUser({});
        }
      });
  }, [id]);
  console.log(user);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <h1>User Contact Details</h1>
        </div>
        <div className="container">
          <strong>
            ID: <span>{id}</span>
          </strong>
          <br />
          <br />
          <strong>
            Name: <span>{user.name}</span>
          </strong>
          <br />
          <br />
          <strong>
            Email: <span>{user.email}</span>
          </strong>
          <br />
          <br />
          <strong>
            Contact: <span>{user.contact}</span>
          </strong>
          <br />
          <br />
        </div>
        <Link to="/">
          <button className=" btn btn-edit">Back</button>
        </Link>
      </div>
    </div>
  );
}

export default View;
