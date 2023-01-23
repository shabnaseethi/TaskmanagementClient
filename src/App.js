import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";

import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import AddTask from "./components/AddTask/AddTask";


function App() {
  return (
    <>
      <div className="App">
        <Router>
          {/* <Header/> */}
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/dashboard" exact element={<Dashboard />}></Route>
            <Route path="/addtask" exact element={<AddTask />}></Route>
          </Routes>
        </Router>
      
      </div>
    </>
  );
}

export default App;
