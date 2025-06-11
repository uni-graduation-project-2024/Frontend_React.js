// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import linkhost from "../../..";
// import "./show-user.css";

// const ShowUser = () => {
//   const { id } = useParams();

//   const [specificUser, setSpecificUser] = useState({
//     loading: true,
//     result: {},
//     err: null,
//   });

//   useEffect(() => {
//     axios
//       .get(`${linkhost}/api/User/user-profile?userId=${id}`)
//       .then((response) => {
//         setSpecificUser({
//           loading: false,
//           result: response.data,
//           err: null,
//         });
//       })
//       .catch((err) => {
//         const message =
//           err?.response?.status === 404 ? "User not found" : "Something went wrong";
//         setSpecificUser({
//           loading: false,
//           result: {},
//           err: [{ msg: message }],
//         });
//       });
//   }, [id]);

//   const loadingSpinner = () => {
//     return (
//       <div className="show-user-container">
//         <div className="container h-100">
//           <div className="row h-100 justify-content-center align-items-center">
//             <div className="spinner-border" role="status">
//               <span className="sr-only">Loading...</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="show-user-container">
//       {specificUser.loading ? (
//         loadingSpinner()
//       ) : (
//         <div className="container h-100">
//           <div className="row h-100 justify-content-center align-items-center">
//             <div className="col-xl-12">
//               <div className="card mb-4">
//                 <div className="card-header">Account Info</div>
//                 <div className="card-body">
//                   {specificUser.err ? (
//                     <div className="text-center text-danger fw-bold">
//                       {specificUser.err[0].msg}
//                     </div>
//                   ) : (
//                     <>
//                       <div className="input-wrapper">
//                         <label>User Name</label>
//                         <input
//                           className="form-control"
//                           type="text"
//                           readOnly
//                           value={specificUser.result.username || ""}
//                         />
//                       </div>
//                       <div className="input-wrapper">
//                         <label>Email Address</label>
//                         <input
//                           className="form-control"
//                           type="email"
//                           readOnly
//                           value={specificUser.result.email || ""}
//                         />
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowUser;


import { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import linkhost from "../../..";
import { FaArrowLeft } from "react-icons/fa"; // Back icon
import "./show-user.css";

const ShowUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [specificUser, setSpecificUser] = useState({
    loading: true,
    result: {},
    err: null,
  });

  useEffect(() => {
    axios
      .get(`${linkhost}/api/User/user-profile?userId=${id}`)
      .then((response) => {
        setSpecificUser({
          loading: false,
          result: response.data,
          err: null,
        });
      })
      .catch((err) => {
        const message =
          err?.response?.status === 404 ? "User not found" : "Something went wrong";
        setSpecificUser({
          loading: false,
          result: {},
          err: [{ msg: message }],
        });
      });
  }, [id]);

  const loadingSpinner = () => {
    return (
      <div className="show-user-container">
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="show-user-container">
      <button
              className="shoo-back-btn"
              onClick={() => navigate("/admin/dashboard")}
            >
              <FaArrowLeft style={{ marginRight: "8px" }} />
              Back to manage users
            </button>
      {specificUser.loading ? (
        loadingSpinner()
      ) : (
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-xl-12">
              <div className="card mb-4">
                <div className="card-header">Account Info</div>
                <div className="card-body">
                  {specificUser.err ? (
                    <div className="text-center text-danger fw-bold">
                      {specificUser.err[0].msg}
                    </div>
                  ) : (
                    <>
                      <div className="input-wrapper">
                        <label>User Name</label>
                        <input
                          className="form-control"
                          type="text"
                          readOnly
                          value={specificUser.result.username || ""}
                        />
                      </div>
                      <div className="input-wrapper">
                        <label>Email Address</label>
                        <input
                          className="form-control"
                          type="email"
                          readOnly
                          value={specificUser.result.email || ""}
                        />
                      </div>
                      <div className="input-wrapper">
                        <label>Joined Date</label>
                        <input
                          className="form-control"
                          type="text"
                          readOnly
                          value={new Date(specificUser.result.joinedDate).toLocaleString()}
                        />
                      </div>
                      <div className="input-wrapper">
                        <label>Total XP</label>
                        <input
                          className="form-control"
                          type="number"
                          readOnly
                          value={specificUser.result.totalXp || 0}
                        />
                      </div>
                      <div className="input-wrapper">
                        <label>Total Questions</label>
                        <input
                          className="form-control"
                          type="number"
                          readOnly
                          value={specificUser.result.totalQuestion || 0}
                        />
                      </div>
                      <div className="input-wrapper">
                        <label>Max Streak Score</label>
                        <input
                          className="form-control"
                          type="number"
                          readOnly
                          value={specificUser.result.maxStreakScore || 0}
                        />
                      </div>
                      <div className="input-wrapper">
                        <label>Exams Created</label>
                        <input
                          className="form-control"
                          type="number"
                          readOnly
                          value={specificUser.result.examsCreated || 0}
                        />
                      </div>
                      <div className="input-wrapper">
                        <label>Top Finishes</label>
                        <input
                          className="form-control"
                          type="number"
                          readOnly
                          value={specificUser.result.finishTop || 0}
                        />
                      </div>
                      <div className="input-wrapper">
                        <label>Level</label>
                        <input
                          className="form-control"
                          type="number"
                          readOnly
                          value={specificUser.result.level || 0}
                        />
                      </div>
                      {/* <div className="input-wrapper text-center mt-4">
                        <label className="d-block">Profile Image</label>
                        <img
                          src={specificUser.result.profileImage}
                          alt="Profile"
                          className="img-thumbnail"
                          style={{ maxWidth: "200px", height: "auto" }}
                        />
                      </div> */}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowUser;
