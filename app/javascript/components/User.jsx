import React from "react";
import { Link } from "react-router-dom";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user:  {}
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/users/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ user: response }))
      .catch(() => this.props.history.push("/users"));
  }

  render() {
    const { user } = this.state;
    return (
      <div className="">
        <div className="hero text-center">
          <h5 className="mb-3">{`User#${this.props.match.params.id}`}</h5>
          <span className="form-control position-relative">
            FirstName: {user.first_name}
          </span>
          <span className="form-control position-relative">
            LastName: {user.last_name}
          </span>
          <span className="form-control position-relative">
            Address: {user.address}
          </span>
        </div>
        <div className="hero text-center mt-3">
          <Link to="/users" className="m-3 btn custom-button border-dark">
            Back to Users
          </Link>
          <Link to="/" className="btn custom-button border-dark">
            Home
          </Link>
        </div>
      </div>
    );
  }

}

export default User;