import React, { useState, useEffect } from "react";
import "./SearchingResultPage.css";
import { Link, useLocation } from "react-router-dom";
import firebaseDB from "../Firebase";

export const SearchingResultPage = () => {
  const [data, setdata] = useState({});
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let search = query.get("name"); //! " name " means  by name we will perform searching
  console.log(search);

  useEffect(() => {
    searchData();
  }, [search]);

  const searchData = () => {
    firebaseDB
      .child("Contacts")
      .orderByChild("name")
      .equalTo(search)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setdata(data);
        }
      });
  };

  

  console.log("data", data);
  return (
    <>
      <div style={{ marginTop: "100px" }}>

        {Object.keys(data).length===0 ? (
          <h2>No search Found with name  : <span style={{fontWeight: "normal"}}> " {query.get("name")} </span> "</h2>
        ):(
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Contact</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].name}</td>
                  <td>{data[id].email}</td>
                  <td>{data[id].contact}</td>
                  <td>{data[id].status}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(id)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>


)
}
<Link to='/' className="btn btn-edit">Go Back</Link>
      </div>
    </>
  );
};
