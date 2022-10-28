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

  return (
    <div className="App">
      <h1>Users : {users.length}</h1>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
