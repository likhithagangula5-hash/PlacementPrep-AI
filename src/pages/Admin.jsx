import { useEffect, useState } from "react";

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {users.length === 0 ? (
        <p>No users logged in yet.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Email</th>
              <th>Login Time</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.email}</td>
                <td>{user.loginTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Admin;