import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Col,
  Row,
  Jumbotron,
} from "reactstrap";
import { addStadium } from "../redux/actions/stadiumAction";
import { connect } from "react-redux";

const StadiumAddForm = ({ addStadium, history, stadiums }) => {
 /*  useEffect(() => {
    history.push("/stadium/me");
  }, [stadiums.length]); */
  const [formData, setFormData] = useState({
    name: "",
    length: "",
    width: "",
    image: "",
    governorate: "",
    city: "",
    street: "",
    description: "",
  });

  const {
    name,
    length,
    width,
    image,
    governorate,
    city,
    street,
    description,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStadium({
      name,
      length,
      width,
      image,
      governorate,
      city,
      street,
      description,
    });
    history.push('/mystadiums')
  
    
  };

  return (
    <div>
      <h1>Add a stadium</h1>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Stadium name"
            value={name}
            onChange={handleChange}
          />
        </FormGroup>
        <h5 className="display-5">Area</h5>
        <Jumbotron>
          <Row>
            <Col md={2}>
              <FormGroup>
                <Label>length</Label>
                <Input
                  type="number"
                  name="length"
                  value={length}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label>width</Label>
                <Input
                  type="number"
                  name="width"
                  value={width}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </Jumbotron>
        <h5 className="display-5">Address</h5>
        <Jumbotron>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Gouvernorate</Label>
                <Input
                  type="select"
                  name="governorate"
                  value={governorate}
                  onChange={handleChange}
                >
                  <option>Ariana</option>
                  <option>Ben Arous</option>
                  <option>Bizerte </option>
                  <option>Gabès</option>
                  <option>Gafsa</option>
                  <option>Jendouba</option>
                  <option>Kairouan</option>
                  <option>Kasserine </option>
                  <option>Kébili</option>
                  <option>Le Kef</option>
                  <option>Mahdia</option>
                  <option>La Manouba</option>
                  <option>Médenine</option>
                  <option>Monastir</option>
                  <option>Nabeul</option>
                  <option>Sfax</option>
                  <option>Sidi Bouzid</option>
                  <option>Siliana</option>
                  <option>Sousse</option>
                  <option>Tataouine</option>
                  <option>Tozeur</option>
                  <option>Tunis</option>
                  <option>Zaghouan</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  placeholder="city"
                  value={city}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label>Street</Label>
            <Input
              type="text"
              name="street"
              placeholder="Street"
              value={street}
              onChange={handleChange}
            />
          </FormGroup>
        </Jumbotron>

        <FormGroup>
          <Label>Description</Label>
          <Input
            type="textarea"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <CustomInput
            type="file"
            name="customFile"
            label="Pick a zip with all informations relative to your identity and a copy of the ownership"
          />
        </FormGroup>
        <FormGroup>
          <CustomInput
            type="file"
            name="customFile"
            label="Pick a picture for your stadium"
            value={image}
            onChange={handleChange}
          />
        </FormGroup>
        <Button color="success" block style={{ marginBottom: "1rem" }}>
          Submit
        </Button>
        <Link to="mystadiums" style={{ textDecoration: "none" }}>
          <Button color="danger" block style={{marginBottom:"1rem"}}>
            Cancel
          </Button>
        </Link>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  stadiums: state.stadiumReducer.stadiums,
});

export default connect(mapStateToProps, { addStadium })(StadiumAddForm);
