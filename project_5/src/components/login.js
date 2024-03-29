import React , {useState} from "react";
import { useNavigate } from 'react-router-dom';

import './styles/login.css'

const Login = () => {
    const [formValue, setFormValues] = useState({ username: '', password: '' });
    const [data, setData] = useState();
    const navigate = useNavigate();


    const handleChange = event => {
      const { name, value } = event.target;
      setFormValues(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = event => {
      event.preventDefault();
      async function fetchData() {
        await fetch(`https://jsonplaceholder.typicode.com/users?username=${formValue.username}`)
          .then(response => response.json())
          .then(user => {
            if(user.length === 0){
              throw("username or password wrong. 000")
            }
            setData(user[0]);
            console.log(user[0])
            console.log(data, "11111111")
            if (user[0].address.geo.lat.slice(-4) === formValue.password){
              localStorage.setItem("user", JSON.stringify(user[0]));
              console.log("navigate")
              navigate(`/application/${user[0].id}`);
            } else {
              throw("username or password wrong. 111")
            }
            console.log(data, "2222222222222")
            }).catch(err => alert(err))
      }
      fetchData()

    }




    return (
        <form onSubmit={handleSubmit} className="form-box">
          <label>
            Username:
            <input type="text"  name="username" className="input-field" value={formValue.username} onChange={handleChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" className="input-field"  value={formValue.password} onChange={handleChange} />
          </label>
          <br />
          <div className="connect">
          <button type="submit" className="btn-field connect">Log in</button>
          </div>
        </form>
      );
}

export default Login;