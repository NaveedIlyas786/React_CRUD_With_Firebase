import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();
  const navigate = useNavigate(); // Replace useNavigate with useHistory
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddContact");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?name=${search}`); // Use navigate.push instead of navigate
    setSearch("");
  };

  return (
    <div className="header">
      <Link className="Linkdeco" to="/">
        <h1 className="h1title text-warning" onClick={() => setActiveTab("Home")}>
          React firebase CRUD
        </h1>
      </Link>

      <div className="header-right">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="inputField"
            placeholder="Search Here ...."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </form>
        <Link to="/">
          <p
            className={`${activeTab === "Home" ? "active" : ""}`}
            onClick={() => setActiveTab("Home")}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            className={`${activeTab === "AddContact" ? "active" : ""}`}
            onClick={() => setActiveTab("AddContact")}
          >
            ADD+
          </p>
        </Link>
        <Link className="about" to="/about">
          <p
            className={`${activeTab === "About" ? "active" : ""}`}
            onClick={() => setActiveTab("About")}
          >
            About
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Header;
