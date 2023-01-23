import React,{useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux"

const Login = () => {
  const [inputValues, setInputValues] = useState({});

  const dispatch =useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit =async(e)=>{
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValues),
      }).then((res) => res.json())
      .then((data) => {
        if (data) {
          if (data.user) {
     
            navigate("/dashboard");
          }
        } else {
          console.log("No data");
        }
      });

      
    } catch (error) {
      
    }

  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await fetch("/login")
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              if (data.user) {
                // const user = {
                //   id: data.user.id,
                //   email: data.user.email,
                // };
                localStorage.setItem("user", JSON.stringify(parseInt(data.user.id)));
                navigate("/dashboard");
              }
            } else {
              console.log("No User");
            }
          });
      } catch (error) {
        throw error.message;
      }
    };
    fetchUser();
  }, [navigate, dispatch]);


  return (
    <>
      <div className="login">
        <form onSubmit={handleSubmit}>
        <div className="group">
          <label htmlFor="user" className="label">
            Username
          </label>
          <input
          name="email"
            id="username"
            type="text"
            className="input"
            placeholder="Enter your username"
            onChange={handleOnChange}
          />
        </div>
        <div className="group">
          <label htmlFor="pass" className="label">
            Password
          </label>
          <input
          name="password"
            id="password"
            type="password"
            className="input"
            data-type="password"
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <div className="group">
          <input type="submit" className="button" value="Sign In" />
        </div>
        <div className="hr"></div>
        </form>
       
      </div>
    </>
  );
};

export default Login;
