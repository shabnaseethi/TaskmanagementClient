import React,{useState} from "react";



const Register = () => {
  const [userdata, setUserdata] = useState({
    name: "",
    
    password: "",
    confirmpassword: "",
    email: "",
  });
  const [errors,setErrors] = useState([]);
  const [success,setSuccess] =useState("");
  const handleOnChange=(e)=>{
    const { name, value } = e.target;
  
    setUserdata({ ...userdata, [name]: value });
    
  }
  
  const handleSubmit =(e)=>{
    e.preventDefault();
    const response = fetch(`/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setErrors(data);
        if(data.isRegistered){
          setSuccess("Successfully Registered!!! PLease Login");
          setUserdata({});
        }
        return data;
      });
    return response;
  }
  
  return (
    <>
     <div className="sign-up-form">
    
                <div className="group">
                  <label htmlFor="user" className="label">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="input"
                    placeholder="Create your Username"
                    name="username"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    Password
                  </label>
                  <input
                    id="pass"
                    type="password"
                    className="input"
                    data-type="password"
                    placeholder="Create your password"
                    name="password"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="group">
                  <label className="label">
                    Repeat Password
                  </label>
                  <input
                    type="password"
                    className="input"
                    data-type="password"
                    placeholder="Repeat your password"
                    name="confirmpassword"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="group">
                  <label  className="label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="input"
                    placeholder="Enter your email address"
                    name="email"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="group">
                  <input type="submit" className="button" value="Sign Up" onClick={handleSubmit} />
                </div>
                <div className="hr"></div>
                {errors.length>0?errors.map((error,key)=><p>{error.message}</p>):""}  
                {success!==""?<h5>{success}</h5>:""}
              </div>
    </>
  );
};

export default Register;
