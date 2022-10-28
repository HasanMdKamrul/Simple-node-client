import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("http://localhost:15000/users");
        response.ok ? console.log("Successful") : console.log("failed");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };

    const sendData = async () => {
      try {
        const response = await fetch(`http://localhost:15000/users`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(user),
        });
        response.ok
          ? console.log("data send Successful")
          : console.log("data send failed");
        const data = await response.json();
        setUsers([...users, data]);
      } catch (error) {
        console.log(error.message);
      }
    };
    sendData();
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="name" name="name" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h1>Users : {users.length}</h1>
        <div>
          {users.map((user) => (
            <div key={user._id}>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
