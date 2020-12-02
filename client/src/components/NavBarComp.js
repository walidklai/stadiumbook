import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/registerAction";

const NavbarComp = ({ auth, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const publicLinks = (
    <Nav navbar>
      <NavItem>
        <Link to="/mystadiums">
          {" "}
          <NavLink style={{ color: "white" }}>my stadiums</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/register">
          {" "}
          <NavLink style={{ color: "white" }}>Register</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link to="/login">
          {" "}
          <NavLink style={{ color: "white" }}>Login</NavLink>
        </Link>
      </NavItem>
    </Nav>
  );
    var privateLinks = (
      <Nav navbar>
        <NavItem>
          <Link to="/mystadiums">
            {" "}
            <NavLink style={{ color: "white" }}>my stadiums</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/mybooking">
            {" "}
            <NavLink style={{ color: "white" }}>my Booking</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/" onClick={logout}>
            {" "}
            <NavLink style={{ color: "white" }}>Logout</NavLink>
          </Link>
        </NavItem>
      </Nav>
    );
  return (
    <div>
      <Navbar color="success  " dark expand="md">
        <NavbarBrand href="/" style={{color:auth.isAuth?'lightGreen':null}}>Stadiumbook</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          {auth.user&&auth.user.role=='admin'?<Link to='/adminarea'style={{color:'white'}}>admin area</Link>:''}
          {auth.isAuth ? privateLinks : publicLinks}
        </Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logout })(NavbarComp);
