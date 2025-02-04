
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken } from "../../../services/auth";
import { useParams } from "react-router-dom";
import "./update-user.css";

export const UpdateUser = () => {
  const { id } = useParams();
  const { token, user } = getAuthToken();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [specificUser, setSpecificUser] = useState({
    loading: true,
    result: {},
    err: null,
  });

  const [updateUser, setUpdateUser] = useState({
    loading: false,
    result: {},
    err: null,
  });

  const form = useRef({
    username: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get(`https://localhost:7078/api/Admin/GetUserById/${id}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then((response) => {
        setSpecificUser({ ...specificUser, result: response.data, loading: false, err: null });
        setUsername(response.data.username);
        setEmail(response.data.email);
        
      })
      .catch((error) => {
        setSpecificUser({
          ...specificUser,
          result: {
            Username: "",
            Password: "",
            Email: "",
          },
          loading: false,
          err: [{ msg: `Something went wrong` }],
        });
      });
  }, []);

  //To Do: display message email already exists
  const submit = (e) => {
    e.preventDefault();
    setUpdateUser({ ...updateUser, loading: true });

    axios
      .put(`https://localhost:7163/api/Admin/UpdateUser/${id}`, {
        username: form.current.username.value,
        password: form.current.password.value,
        email: form.current.email.value
      })
      .then((response) => {
        setUpdateUser({ ...updateUser, loading: false, result: response.data });
      })
      .catch((error) => {
        setUpdateUser({ ...updateUser, loading: false, err: error.response.data });
      });
  };

  const loadingSpinner = () => {
    return (
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  };

  const error = () => {
    return (
      <div className="container">
        <div className="row">
          {specificUser.err.map((err, index) => {
            return (
              <div key={index} className="col-sm-12 alert alert-danger" role="alert">
                {err.msg}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      {specificUser.err !== null && error()}
      {specificUser.loading === true ? (
        loadingSpinner()
      ) : (
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-xl-12">
              <div className="card mb-4">
                <div className="card-header">Update Account Info</div>
                <div className="card-body">
                  {updateUser.result && Object.keys(updateUser.result).length > 0 && (
                    <div className="alert alert-success" role="alert">
                      User Updated successfully!
                    </div>
                  )}
                  <form onSubmit={(e) => submit(e)}>
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="Username">UserName</label>
                      <input
                        className="form-control"
                        type="text"
                        id="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        ref={(val) => {
                          form.current.username = val;
                        }}
                        placeholder="Enter UserName"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="email">Email address</label>
                      <input
                        className="form-control"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        ref={(val) => {
                          form.current.email = val;
                        }}
                        placeholder="Enter Email address"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="password">New Password</label>
                      <input
                        className="form-control"
                        type="password"
                        id="password"
                        ref={(val) => {
                          form.current.password = val;
                        }}
                        placeholder="Enter New Password"
                        required
                      />
                    </div>
                    <button className="btn btn-primary" type="submit">{specificUser.loading ? "Updating..." : "Update User"}</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};