import React, { useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddTask from "../AddTask/AddTask.jsx";
import { useDispatch } from "react-redux";
import { faSignOut, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import TaskItem from "../TaskItem/TaskItem";
import TaskItemDone from "../TaskItem/TaskItemDone";
import { fetchTasks } from "../../Redux/Task";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState(false);
  const [page, setPage] = useState(true);
  const dispatch = useDispatch();
  const { taskList } = useSelector((state) => state.task);
  // const [name,setName]=useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await fetch("/dashboard")
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              if (data.user) {
                localStorage.setItem("user", JSON.stringify(parseInt(data.user.id)));
                const values = {id:parseInt(data.user.id)}
                dispatch(fetchTasks(values));
              } else {
                navigate("/");
              }
            } else {
              console.log("No data");
            }
          });
      } catch (error) {
        throw error.message;
      }
    };
    fetchUser();
  }, []);
  
  const handleLogout = async () => {
    await axios.post("/logout").then((response) => {
      if (response.status === 200) {
        localStorage.clear();
        navigate("/");
      }
    });
  };

  return (
    <>
     <div className="body">
     <div className="task-manager">
        <div className="left-bar">
          <div className="left-content">
            <div className="profile">
              <FontAwesomeIcon className="img-icon" icon={faUserCircle} />
              {/* <div className="name">{name}</div> */}
            </div>
            <ul>
              <li onClick={() => setPage(true)}>Dashboard</li>
              <li onClick={() => setPage(false)}>NEW TASK</li>
              <li onClick={() => handleLogout()}>
                Logout <FontAwesomeIcon icon={faSignOut} />
              </li>
            </ul>
          </div>
        </div>
        {page ? (
          <div className="page-content">
            <div className="content-categories">
              <div className="label-wrapper">
                <input
                  className="nav-item"
                  name="nav"
                  type="radio"
                  id="opt-1"
                  onClick={() => setInput(false)}
                  onChange={(e) => e.target.value}
                />
                <label className="category" htmlFor="opt-1">
                  ALL
                </label>
              </div>
              <div className="label-wrapper">
                <input
                  className="nav-item"
                  name="nav"
                  type="radio"
                  id="opt-2"
                  onClick={() => setInput(true)}
                  onChange={(e) => e.target.value}
                />
                <label className="category" htmlFor="opt-2">
                  FINISHED
                </label>
              </div>
            </div>
            {input ? (
              <div className="tasks-wrapper">
                <TaskItemDone />
              </div>
            ) : (
              <div className="tasks-wrapper">
                <TaskItem taskList={taskList} />
              </div>
            )}
          </div>
        ) : (
          <AddTask page={page} setPage={setPage} />
        )}
      </div>
     </div>
    </>
  );
};

export default Dashboard;
