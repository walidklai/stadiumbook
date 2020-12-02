import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import AlertComp from "./Alert";
import { setAlert } from "../redux/actions/alertAction";
import { register } from "../redux/actions/registerAction";
import { connect } from "react-redux";

const Register = ({ setAlert, register ,isAuth,history,alert}) => {
  const [formData, setFormData] = useState({
    name: "",
    cin: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, cin, email, password, password2 } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("password confirmation must match the password", "danger");
    } else {
      register({ name, email, password ,cin});
      setTimeout(()=>{setTimeout(()=>{ if(alert._d===null) 
        return history.push('/login')},1000)}
      
    ,2000)
    
  }};
  if(isAuth)
  return <Redirect to='/'/>
  return (
    <div>
      <h1 style={{ marginTop: "3rem", marginBottom: "2rem" }}>Register</h1>
      <Form onSubmit={(e)=>handleSubmit(e)}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={name}
            placeholder="type your name here ...."
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label>CIN</Label>
          <Input
            type="number"
            name="cin"
            value={cin}
            placeholder="type CIN number here ...."
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="type your email here ...."
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={password}
            placeholder="password of minimum 8 characters"
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="password2"
            value={password2}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <Button color="success">Register</Button>
        <br />
        <span>
          Already have an account ? <Link to="/login">Login</Link>
        </span>
      </Form>
    </div>
  );
};

const mapStateToProps=(state)=>({
  isAuth:state.authReducer.isAuth,
  alert:state.alertReducer
})

export default connect(mapStateToProps, { setAlert, register })(Register);
