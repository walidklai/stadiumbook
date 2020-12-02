import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { filterStadiums } from "../redux/actions/stadiumAction";

const SearchComp = ({ filterStadiums}) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [searchData, setSearchData] = useState({
    governorate: "All",
  });

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const { governorate } = searchData;

  return (
    <div>
      <Button
        block
        color="success"
        onClick={toggle}
        style={{ marginBottom: "1rem", marginTop: "1rem" }}
      >
        Filter
      </Button>
      <Collapse isOpen={isOpen}>
        <Form>
          <FormGroup>
            <Label>Gouvernorate</Label>
            <Input
              type="select"
              name="governorate"
              value={governorate}
              onChange={handleChange}
            >
              <option>All</option>
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
        </Form>
        <Link block to={`/search/${governorate === "All" ? "" : governorate}`}>
          <Button
            block
            color="success"
            style={{ marginBottom: "1rem" }}
            onClick={() => filterStadiums({ governorate })}
          >
            Search
          </Button>
        </Link>
      </Collapse>
    </div>
  );
};

export default connect(null, { filterStadiums })(SearchComp);
