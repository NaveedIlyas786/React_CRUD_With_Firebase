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
  const filterData = (value) => {
    firebaseDB
      .child("Contacts")
      .orderByChild("status")
      .equalTo(value)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setdata(data);
        }
      });
  };

  // Check if data is empty
  const isDataEmpty = Object.keys(data).length === 0;
  const AllData = Object.keys(data);
  return (
    <>
      <div className="top">
        <div className="sorting">
          <label htmlFor="SortBy">SortBy: </label>
          <div className="sorteddata">
          <select
            className="dropdown"
            name="columnValue"
            onChange={handleChange}
          >
            <option>Please Select</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="contact">Contact</option>
            <option value="status">Status</option>
          </select>
          <button className="btn btn-info" onClick={handleReset}>
            Reset Sorting
          </button>
          </div>
        </div>
        <div className="statusSection align-items-center ">
          <label className="me-2">Status</label>
          <button
            className="btn btn-success "
            onClick={() => filterData("Active")}
          >
            Active
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => filterData("Inactive")}
          >
            InActive
          </button>
        </div>
      </div>

      <div className="table-responsive  parent">
        <table className="table bg-white child">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Contact</th>
              <th style={{ textAlign: "center" }}>Status</th>
              {!sort ? <th style={{ textAlign: "center" }}>Actions</th>:""}
            </tr>
          </thead>
          {/* //! Body Section */}
          {isDataEmpty ? (
            <tbody className="text-center">
              <tr>
                <td colSpan="12" className="text-center nodata">
                  <h1 className="mt-5">There is no data in the Table</h1>
                  <Link
                    to="/add"
                    className="btn btn-success px-5"
                    style={{ textDecoration: "none" }}
                  >
                    <span style={{ fontWeight: "normal" }}>Add+</span>
                  </Link>
                </td>
              </tr>
            </tbody>
          ) : (
            <>
              {!sort && (
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
                          <Link to={`/view/${id}`}>
                            <button className="btn btn-view">View</button>
                          </Link>
                          <Link to={`/update/${id}`}>
                            <button className="btn btn-warning">Edit</button>
                          </Link>
                          <button
                            className="btn btn-delete"
                            onClick={() => onDelete(id)}
                          >
                            Delete
                          </button>
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
                       
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </>
          )}
        </table>
      </div>

      
    </>
  );
}

export default Home;
