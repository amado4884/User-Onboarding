import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Form from "./components/Form";
import User from "./components/User";

function App() {
  const [users, setUsers] = useState([]);
  const submitForm = async (formData) => {
    const { data, status } = await axios.post("https://reqres.in/api/users", formData);

    if (status === 201) setUsers([...users, data]);
    else console.log("There was an error");
  };

  return (
    <div className="App">
      <Form submitForm={submitForm} />
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
}

export default App;
