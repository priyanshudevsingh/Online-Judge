import React, {useState} from "react";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    name:"", userid:"", email:"", password:"", cpassword:"" 
  });

  let name, value;
  const handleInputs=(e)=>{
    // console.log(e);
    name=e.target.name;
    value=e.target.value;
    setUser({...user, [name]:value});
  }

  return (
    <>
      <section>
        <div className="form-box-register">
          <div className="form-value">
            <form>
              <h2>Register</h2>

              <div className="inputbox">
                <label htmlFor="name">
                  <span className="material-symbols-outlined">person</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="off"
                  value={user.name}
                  onChange={handleInputs}
                  placeholder="Name"
                ></input>
              </div>

              <div className="inputbox">
                <label htmlFor="userid">
                  <span className="material-symbols-outlined">face</span>
                </label>
                <input
                  type="text"
                  name="userid"
                  required
                  autoComplete="off"
                  value={user.userid}
                  onChange={handleInputs}
                  placeholder="UserID"
                ></input>
              </div>

              <div className="inputbox">
                <label htmlFor="email">
                  <span className="material-symbols-outlined">mail</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="off"
                  value={user.email}
                  onChange={handleInputs}
                  placeholder="Email"
                ></input>
              </div>

              <div className="inputbox">
                <label htmlFor="password">
                  <span className="material-symbols-outlined">password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  autoComplete="off"
                  value={user.password}
                  onChange={handleInputs}
                  placeholder="Password"
                ></input>
              </div>

              <div className="inputbox">
                <label htmlFor="cpassword">
                  <span className="material-symbols-outlined">check</span>
                </label>
                <input
                  type="password"
                  name="cpassword"
                  required
                  autoComplete="off"
                  value={user.cpassword}
                  onChange={handleInputs}
                  placeholder="Confirm Password"
                ></input>
              </div>

              <div className="click">
                <input type="submit" value="Register" />
              </div>

            </form>

            <NavLink className="already" to="/login">I am already registered</NavLink>

          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
