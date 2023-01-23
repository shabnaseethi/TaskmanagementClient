import React, { useEffect, useState } from "react";
import "../AddTask/AddTask.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { updateTaskById } from "../../Redux/Task";
import { useDispatch} from "react-redux";


const UpdateTask = (props) => {
  const date = new Date();
  const [taskDate, setTaskDate] = useState(date.toDateString());
  const [task, setTask] = useState({task_name:""});
  const dispatch = useDispatch();


  const onDateChange = (newDate) => {
    setTaskDate(newDate.toDateString());
  };
  const handleClick = (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user")
    const values = {
      id:props.id,
      user_id:user_id,
      task_name: task.task_name,
      date: taskDate,
      status: false,
    };
    console.log(values);

   dispatch(updateTaskById(values));
   setTask({ ...task, task_name:" " });
   setTaskDate(" ");
    props.setTrigger(false)
  };

  useEffect(() => {
    if (props.trigger) {
      const values = { id: parseInt(props.id), user_id: 1 };
      fetch(`/tasks/${values.id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          setTask(data.data[0]);
          setTaskDate(data.data[0].date)
        });
    }
  }, [props.trigger]);


  return props.trigger ? (
    <>
      <div className="update-content">
        <div className="add-content">
          <form onSubmit={(e) => handleClick(e)}>
            <div className="input-container">
              <label htmlFor="add-input"> TASK NAME</label>
              <input
                type="text"
                name="taskName"
                id="add-input"
                required
                value={task.task_name}
                onChange={(e) =>
                  setTask({ ...task, task_name: e.target.value })
                }
              />
            </div>
            <div className="date-box">
              <label htmlFor="add-date"> DATE</label>
              <input
                type="text"
                name="date"
                id="add-date"
                required
                value={taskDate.slice("0","10")}
                onChange={setTaskDate}
              />
              
            </div>
            <Calendar
              value={date}
              onChange={onDateChange}
              className="react-calender"
            />
            <button className="add-button" onClick={(e)=>handleClick(e)}>Update</button>
            <button
              onClick={() => props.setTrigger(false)}
              className="add-button"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

export default UpdateTask;
