import React, { useState } from "react";
import "./AddTask.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { addTasks } from "../../Redux/Task";
import { useDispatch } from "react-redux";

const AddTask = (props) => {
  const date = new Date();
  const [taskDate, setTaskDate] = useState(date.toDateString());
  const [task, setTask] = useState();
  const dispatch = useDispatch();
  const onDateChange = (newDate) => {
    setTaskDate(newDate.toDateString());
  };
  const handleClick = (e) => {
    e.preventDefault();
    const values = {
      user_id:localStorage.getItem("user"),
      task_name: task,
      date: taskDate,
      status: false,
    };
    dispatch(addTasks(values));
    setTask("");
    setTaskDate("");
    props.setPage(true);
  };
  return (
    <>
      <div className="add-content">
        <form onSubmit={(e) => handleClick(e)}>
          <div className="input-container">
            <label htmlFor="add-input"> TASK NAME</label>
            <input
              type="text"
              name="taskName"
              id="add-input"
              required
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="date-box">
            <label htmlFor="add-date"> DATE</label>
            <input
              type="text"
              name="date"
              id="add-date"
              required
              onChange={setTaskDate}
              value={taskDate}
            />
          </div>
          <Calendar
            value={date}
            onChange={onDateChange}
            className="react-calender"
          />
          <button className="add-button">OK</button>
          <button className="add-button" onClick={() => props.setPage(true)}>
            CANCEL
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTask;
