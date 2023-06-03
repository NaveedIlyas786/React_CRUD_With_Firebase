import React, { useState, useEffect } from "react";
import firebaseDB from "../Firebase";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";

function Home() {
  const [data, setdata] = useState({});
  const [sortedData, setSortedData] = useState([]); //! Sorting state
  const [sort, setSort] = useState(false);

  // const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    firebaseDB.child("Contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setdata({ ...snapshot.val() });
      } else {
        setdata({});
      }
    });
    // return () => {
    //   setdata({});
    // };
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Are You Sure to Delete the Contact!")) {
      firebaseDB.child(`Contacts/${id}`).remove((err) => {
        location.reload();
        if (err) {
          toast.error(err);
        } else {
          toast.success("Successfully deleted!");
        }
      });
    }
    setdata({});
  };

  const handleChange = (e) => {
    setSort(true);
    firebaseDB
      .child("Contacts")
      .orderByChild(`${e.target.value}`)
      .on("value", (snapshot) => {
        let sortedData = [];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
        });
        setSortedData(sortedData);
      });
  };

  const handleReset = () => {
    setSort(false);

      firebaseDB.child("Contacts").on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setdata({ ...snapshot.val() });
        } else {
          setdata({});
        }
      });
      // return () => {
      //   setdata({});
      // };
  };

  //! ========For Filtering==========
  const filterData=(value)=>{
firebaseDB.child("Contacts").orderByChild("status").equalTo(value).on("value",(snapshot)=>{
  if(snapshot.val()){
    const data=snapshot.val();
    setdata(data);
  }
})
  }

  return (
    <div style={{ marginTop: "100px" }}>
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
        {!sort && ( //! If user not doing any kind of "sorting" it means we want its implement in parantheses " () "
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
        )}
        {sort && (
          <tbody>
            {sortedData.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>{item.status}</td>
                  <td >    
                    {/* //! In case of sorting these action are not working fix it later */}
                    <Link to={`/update/${index}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(index)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${index}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      {/* //!=========Sorting========== */}
      <label htmlFor="SortBy">SortBy: </label>
      <select className="dropdown" name="columnValue" onChange={handleChange}>
        <option>Please Select</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="contact">Contact</option>
        <option value="status">Status</option>
      </select>
      <button className="btn btn-edit" onClick={handleReset}>
        Reset Sorting
      </button>
      <br />
      <label >Status</label>
      <button className="btn btn-active" onClick={()=>filterData("Active")}>Active</button>
      <button className="btn btn-inactive" onClick={()=>filterData("Inactive")}>InActive</button>
    </div>
  );
}

export default Home;
