import React ,{useState}from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import {connect} from 'react-redux'
import {login} from '../redux/actions/registerAction'

const Login = ({login ,isAuth,history}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    login({email,password})
  }

  if(isAuth)
  return <Redirect to='/'/>
  return (
    <div>
      <h1 style={{ marginTop: "3rem", marginBottom: "2rem" }}>Login</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup check></FormGroup>
        <Button color="success">Login</Button>
        <br />
        <span>
          Don't have an account ? <Link to="/register">Register</Link>
        </span>
      </Form>
    </div>
  );
};

const mapStateToProps=(state)=>({
  isAuth:state.authReducer.isAuth
})

export default connect(mapStateToProps,{login})(Login);
