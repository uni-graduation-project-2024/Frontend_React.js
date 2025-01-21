
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken } from "../../../services/auth";
import { useParams } from "react-router-dom";
export const ShowUser = () => {
  const { id } = useParams();
  const { token, user } = getAuthToken();

  const [specificUser, setSpecificUser] = useState({
    loading: true,
    result: {},
    err: null,
  });

  useEffect(() => {
    axios
      .get(`https://localhost:7163/api/Admin/GetUserById/${id}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then((response) => {
        setSpecificUser({ ...specificUser, result: response.data, loading: false, err: null });
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
                <div className="card-header">Account Info</div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="small mb-1">UserName </label>
                    <input className="form-control" type="text" readOnly value={specificUser.result.username} />
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1">Email address</label>
                    <input className="form-control" type="email" readOnly value={specificUser.result.email} />

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};