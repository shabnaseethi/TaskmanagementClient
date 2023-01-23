import React, { useEffect, useState } from "react";
import "../TaskItem/TaskItem.css";
// import { addTasks } from "../../Redux/Task";
import { useDispatch } from "react-redux";
import { updateTaskStatus,deleteTask } from "../../Redux/Task";
import UpdateTask from "../UpdateTask/UpdateTask";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TaskItem = ({ taskList }) => {
  const [popup, setPopup] = useState(false);
  const [checked, setChecked] = useState([]);
  const [id, setId] = useState();
  const dispatch = useDispatch();
  const handleCheckbox = (task) => {
  
    const newTask = { status: !task.status, id: task.id };
    dispatch(updateTaskStatus(newTask));
  };


  const handleUpdate = (id) => {
    setPopup(true);
    setId(id);
  };

  const handleDelete=(id)=>{
dispatch(deleteTask(parseInt(id)));
  }

  useEffect(() => {
    setChecked(new Array(taskList.length).fill(false));
  }, [taskList]);

  return (
    <div className="task-item">
      <div>
        <table className="task">
          <thead>
            <tr >
              <td colSpan="2">task Name</td>
              <td>task Date</td>
            </tr>
          </thead>
          {taskList.map((task, key) => {
            return (
              <tbody key={key}>
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={task.status}
                      onChange={() => handleCheckbox(task)}
                    />
                  </td>
                  <td>
                    <p>{task.task_name} </p>
                  </td>
                  <td>{task.date.slice("0", "10")}</td>
                  <td>
                    <FontAwesomeIcon
                      className="btn"
                      onClick={() => handleUpdate(task.id)}
                      icon={faEdit}
                    />
                  </td>
                  <td>
                  <FontAwesomeIcon
                      className="btn"
                      onClick={() => handleDelete(task.id)}
                      icon={faTrash}
                    />
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <div className="update-task">
        <UpdateTask trigger={popup} setTrigger={setPopup} id={id} />
      </div>
    </div>
  );
};

export default TaskItem;
