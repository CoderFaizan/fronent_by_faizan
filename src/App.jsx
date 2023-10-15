import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showData, setShowData] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   if (!name || !email || !password) {
     setError("All fields are required");
     return;
   }

    // Create a data object to send to the API
    const formData = {
      name: name,
      email: email,
      password: password,
    };

    // Make a POST request to send the data
    axios
      .post("https://https://faizan-project.cyclic.app//user/add", formData)
      .then((res) => {
        // Handle the response if needed
        console.log("Data sent successfully:", res.data);
        // You may also want to update the data state by making another GET request here
        availableData();
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error sending data:", error);
      });

    // Reset the form fields
    setName("");
    setEmail("");
    setPassword("");

    // Toggle the showData state to display the data table
    setShowData(true);
  };


  const toggleData = () => {
    setShowData(!showData);
  };
  useEffect(() => {
  availableData()
},[])
  const availableData = () => {
  axios
    .get(`https://https://faizan-project.cyclic.app//user/showAll`)
    .then((res) => {
      setData(res.data);
      console.log(data);
    });
}

  const formStyles = {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#f9f9f9",
  };

  const tableStyles = {
    maxWidth: "800px",
    minWidth: "800px",
    margin: "0 auto",
    borderCollapse: "collapse",
    marginBottom: "20px",
  };

  const thStyles = {
    backgroundColor: "lightgray",
    padding: "8px",
    textAlign: "left",
  };

  const tdStyles = {
    border: "1px solid #ccc",
    padding: "8px",
  };

  const inputStyles = {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const buttonStyles = {
    backgroundColor: "blue",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
  };
  const handleDelete = (userId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );
    
  // Make a DELETE request to delete the user
  axios
    .delete(
      `https://https://faizan-project.cyclic.app//user/deleteUser/${userId}`
    )
    .then(() => {
      // If the deletion was successful, you may want to update the data state
      availableData();
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
};

  return (
    <div>
      {" "}
      <h1 style={{ textAlign: "center" }}>
        {showData ? " Available data" : "Add Data"}
      </h1>
      <button onClick={toggleData} style={buttonStyles}>
        Toggle Data
      </button>
      {showData ? (
        <div>
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={thStyles}>Sr.</th>
                <th style={thStyles}>Name</th>
                <th style={thStyles}>Email</th>
                <th style={thStyles}>Value</th>
                <th style={thStyles}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user, index) => (
                <tr key={user._id}>
                  <td style={tdStyles}>{index + 1}</td>
                  <td style={tdStyles}>{user._id}</td>
                  <td style={tdStyles}>{user.name}</td>
                  <td style={tdStyles}>{user.email}</td>
                  <td style={tdStyles}>{user.password}</td>
                  <td style={tdStyles}>
                    <button onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <form style={formStyles} onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              style={inputStyles}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              style={inputStyles}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              style={inputStyles}
            />
          </div>
          <button type="submit" style={buttonStyles}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default App;
