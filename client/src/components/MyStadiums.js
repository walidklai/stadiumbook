import React, { useEffect } from "react";
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
import { getMyStadiums, removeStadium } from "../redux/actions/stadiumAction";

const MyStadiums = ({ getMyStadiums, stadiumsData, removeStadium }) => {
  useEffect(() => {
    getMyStadiums();
  }, []);
  return (
    <div>
      <h1>My Stadiums</h1>
      {stadiumsData.loading ? (
        <h1>Loading</h1>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {!stadiumsData.loading &&
            stadiumsData &&
            stadiumsData.stadiums &&
            stadiumsData.stadiums.map((el) => (
              <div key={el.id}>
                <Card style={{ width: "250px", marginLeft: "1rem" }}>
                  <CardImg
                    top
                    width="100%"
                    src={el.image}
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardTitle>{el.name}</CardTitle>
                    <CardSubtitle>{el.address.governorate}</CardSubtitle>
                    <CardSubtitle>{el.address.city}</CardSubtitle>
                    <CardText>{el.address.street}</CardText>
                    <Link to={`/stadium/edit/${el._id}`}>
                      <Button color="success" style={{ marginRight: "1rem" }}>
                        Edit
                      </Button>
                    </Link>

                    <Button
                      color="danger"
                      onClick={() => removeStadium(el._id)}
                    >
                      Remove
                    </Button>
                  </CardBody>
                </Card>
              </div>
            ))}
        </div>
      )}
      <Link to="/stadiumform">
        <Button
          color="success"
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            marginLeft: "1rem",
          }}
        >
          Add a stadium
        </Button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  stadiumsData: state.myStadiumsReducer,
});

export default connect(mapStateToProps, { getMyStadiums, removeStadium })(
  MyStadiums
);
