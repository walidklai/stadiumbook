import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { getStadiums } from "../redux/actions/stadiumAction";
import SearchComp from "./SearchComp";
import { setAuthToken } from "../utility/setAuthToken";

if (localStorage.token) setAuthToken(localStorage.token);

const Stadiums = ({ getStadiums, stadiumsData, auth, match }) => {
  useEffect(() => {
    getStadiums();
  }, []);
  return (
    <div>
      {!auth.loading && auth.isAuth && auth.user && auth.user.name ? (
        <h4 style={{ marginTop: "3rem", marginBottom: "2rem" }}>
          Welcome {auth.user.name}
        </h4>
      ) : null}
      <SearchComp />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {stadiumsData.map((el) => (
          <div key={el.id}>
            <Card style={{ width: "250px", marginLeft: "1rem" }}>
              <CardImg top width="100%" src={el.image} alt="Card image cap" />
              <CardBody>
                <CardTitle>{el.name}</CardTitle>
                <CardSubtitle>{el.address.governorate}</CardSubtitle>
                <CardSubtitle>{el.address.city}</CardSubtitle>
                <CardText>{el.address.street}</CardText>
                <Link to={`/stadium/${el._id}`}>
                  <Button color="success">Details/Booking</Button>
                </Link>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  stadiumsData: state.stadiumReducer.stadiums,
  auth: state.authReducer,
});

export default connect(mapStateToProps, { getStadiums })(Stadiums);
