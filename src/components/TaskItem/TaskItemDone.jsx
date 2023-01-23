import React, { useEffect } from "react";
import "./TaskItem.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchFinishedTasks } from "../../Redux/Task";

const TaskItemDone = () => {
  const { tasksDone } = useSelector((state) => state.task);
  console.log(tasksDone);
  const dispatch = useDispatch();
  useEffect(() => {
    const values = { user_id:parseInt(localStorage.getItem("user")) };
    dispatch(fetchFinishedTasks(values));
  }, []);
  return (
    <div className="task-item">
      <div>
        <table className="task">
          {tasksDone.map((task, key) => {
            return (
              <tbody key={key}>
                <tr>
                  <td>
                    <p>{task.task_name} </p>
                  </td>
                  <td>Finished</td>
                  <td>{task.date.slice("0", "10")}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default TaskItemDone;
