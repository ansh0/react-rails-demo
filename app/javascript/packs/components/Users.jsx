import React from "react";
import { Link } from "react-router-dom";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    const url = "/api/v1/users";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ users: response }))
      .catch(() => this.props.history.push("/"));
  }

  deleteUser = (id) => {
    const url = `/api/v1/users/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(() => {
      let users = this.state.users.filter(user => {
        return user.id !== id 
      })
      this.setState({users: users})
    })
    .catch(error => console.log(error.message));
  }

  render() {
    const { users } = this.state;

    return (
      <div className="py-5">
          <main className="container">
            <div className="mb-3 input-group justify-content-between">
              <div>
                <Link to="/" className="btn btn-link border-dark">
                  Home
                </Link>
              </div>
              <div className="text-right">
                <Link to="/user" className="btn btn-success border-dark text-white">
                  Create New User
                </Link>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  { users.map(user => {
                    return (<tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.address}</td>
                      <td>
                        <Link to={`/user/${user.id}/edit`} className="btn btn-primary border-dark text-white ml-2">
                          Edit
                        </Link> |
                        <Link to={`/user/${user.id}`} className="btn btn-success border-dark text-white mr-2 ml-2">
                          Show
                        </Link> |
                        <button type="button" className="btn btn-danger text-white ml-2" onClick={() => this.deleteUser(user.id)}>
                          Delete
                        </button>                                            
                      </td>
                    </tr>)
                  })
                }
                </tbody>
              </table>
            </div>
          </main>
        </div>)
  }
}
export default Users;