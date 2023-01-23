import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const INITIAL_STATE = {
  taskList: [],
  tasksDone: [],
  taskById: [],
};

export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (values) => {
    const response = fetch("/tasks", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return response;
  }
);

export const fetchFinishedTasks = createAsyncThunk(
  "task/fetchFinishedTasks",
  async (values) => {
    const response = fetch("/tasksdone", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
    return response;
  }
);

export const addTasks = createAsyncThunk("task/addTasks", async (values) => {
  const response = fetch("/task", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });

  return response;
});

export const updateTaskStatus = createAsyncThunk(
  "task/updateTask",
  async (values) => {
    const response = fetch(`/task/${parseInt(values.id)}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values,
        user_id: parseInt(localStorage.getItem("user")),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });

    return response;
  }
);

export const updateTaskById = createAsyncThunk(
  "task/updateTaskById",
  async (values) => {
    const response = fetch(`/update/${parseInt(values.id)}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });

    return response;
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (values) => {
    const response = fetch(`/task/${values}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: parseInt(localStorage.getItem("user")) }),
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });

    return response;
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: {
    [fetchTasks.pending]: (state, action) => {
      console.log("Loading");
    },
    [fetchTasks.fulfilled]: (state, action) => {
      state.taskList = action.payload;
    },
    [fetchTasks.rejected]: (state, action) => {
      console.log("Rejected");
    },
    [fetchFinishedTasks.pending]: (state, action) => {
      console.log("Loading");
    },
    [fetchFinishedTasks.fulfilled]: (state, action) => {
      state.tasksDone = action.payload;
    },
    [fetchFinishedTasks.rejected]: (state, action) => {
      console.log("Rejected");
    },
    [addTasks.pending]: (state, action) => {
      console.log("Loading");
    },
    [addTasks.fulfilled]: (state, action) => {
      state.taskList.push(action.payload);
    },
    [addTasks.rejected]: (state, action) => {
      // console.log("Rejected");
    },
    [updateTaskStatus.pending]: (state, action) => {
      // console.log("Loading");
    },
    [updateTaskStatus.fulfilled]: (state, action) => {
      state.taskList.forEach((task) => {
        if (task.id === action.payload.id) {
          task.status = !task.status;
        }
      });
    },
    [updateTaskStatus.rejected]: (state, action) => {
      // console.log("Rejected");
    },
    [updateTaskById.pending]: (state, action) => {
      // console.log("Loading");
    },
    [updateTaskById.fulfilled]: (state, action) => {
      const updatedTask = action.payload;
      const index = state.taskList.findIndex(
        (task) => task.id === action.payload.id
      );

      const newArray = [...state.taskList];

      newArray[index] = updatedTask;

      return {
        ...state,
        taskList: newArray,
      };
    },
    [updateTaskById.rejected]: (state, action) => {
      // console.log("Rejected");
    },
    [deleteTask.pending]: (state, action) => {
      // console.log("Loading");
    },
    [deleteTask.fulfilled]: (state, action) => {
      
      const newTaskList = state.taskList.filter(
        (task) => task.id !== action.payload.id
      );
      state.taskList = newTaskList;
    },
    [deleteTask.rejected]: (state, action) => {
      // console.log("Rejected");
    },
  },
});

export default taskSlice.reducer;
