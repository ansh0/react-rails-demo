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
                <Link to="/user" className="btn custom-button border-dark">
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
                        <Link to="/user" className="btn custom-button border-dark">
                          Edit
                        </Link> |
                        <Link to="/user" className="btn custom-button border-dark">
                          Show
                        </Link> |
                        <Link to="/user" className="btn custom-button border-dark">
                          Delete
                        </Link>                                                
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