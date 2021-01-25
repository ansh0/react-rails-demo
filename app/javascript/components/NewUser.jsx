import React from "react";
import { Link } from "react-router-dom";

class NewUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      address: '',
    };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/users";
    const { first_name, last_name, address} = this.state;

    if (first_name == '' || last_name == '' || address == '')
      return;

    const body = {
      first_name,
      last_name,
      address
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/user/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new User to collection.
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="recipeName">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  id="firstName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipeName">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  id="lastName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipeName">Address</label>
                <input
                  type="text"
                  name="address"
                  id="Address"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>                            
              <button type="submit" className="btn custom-button border-dark ml-3 mt-3">
                Create User
              </button>
              <Link to="/Users" className="btn custom-button border-dark mt-3">
                Back to Users
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default NewUser;