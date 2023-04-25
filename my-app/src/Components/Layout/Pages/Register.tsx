import React, { useState } from 'react'
import { useRegisterUserMutation } from '../../../apis/authApi';
import { inputHelper, toastNotify } from '../../../Helper';
import { apiResponse } from '../../../Interfaces';
import { SD_Roles } from '../../../Utility/SD'
import { useNavigate } from 'react-router-dom';
import { MainLoader } from '../Page/Common';

const Register = () => {

    const navigate = useNavigate();

    const [registerUser] = useRegisterUserMutation();

    const[loading,setLoading] = useState(false);
    const [userInput, setUserInput] = useState({
        userName: "",
        password: "",
        role: "",
        name: "",
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const tempData = inputHelper(e, userInput);
        setUserInput(tempData);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const response : apiResponse = await registerUser({
            userName: userInput.userName,
            password: userInput.password,
            role: userInput.role,
            name: userInput.name
        });

        if(response.data){
            toastNotify("Registration successful! Please login to continue.")

            navigate("/login")
        }
        else if (response.error) {
            toastNotify(response.error.data.errorMessages[0], "error")
        }

        setLoading(false);
    }


  return (
    <div >
          <div className="container text-center">
            {loading && <MainLoader/>}
              <form method="post" onSubmit={handleSubmit}>
                  <h1 className="mt-5" style={{ color:"#FFBF00"}}>Register</h1>
                  <div className="mt-5">
                      <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Username"
                              required
                              value ={userInput.userName}
                              name ="userName"
                              onChange={handleUserInput}
                          />
                      </div>
                      <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Name"
                              required
                              name="name"
                              value={userInput.name}
                              onChange={handleUserInput}
                          />
                      </div>
                      <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                          <input
                              type="password"
                              className="form-control"
                              placeholder="Enter Password"
                              required
                              name="password"
                              value={userInput.password}
                              onChange={handleUserInput}
                          />
                      </div>
                      <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                          <select className="form-control form-select" required  name="role" value={userInput.role}
                              onChange={handleUserInput}>
                              <option value="">--Select Role--</option>
                              <option value={`${SD_Roles.CUSTOMER}`}>Customer</option>
                              <option value={`${SD_Roles.ADMIN}`}>Admin</option>
                          </select>
                      </div>
                  </div>
                  <div className="mt-5">
                      <button type="submit" className="btn" style={{ background: "#FFBF00", border: "1px solid #FF4433" }} disabled={loading}>
                          Register
                      </button>
                  </div>
              </form>
          </div>

    </div>
      
  )
}

export default Register