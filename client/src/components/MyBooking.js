import React, { useEffect } from "react";
import { Button, Col, Jumbotron, Row } from "reactstrap";
import { getBooking, deleteBooking } from "../redux/actions/bookingAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const MyBooking = ({
  booking: { booking ,loading},
  getBooking,
  user,
  deleteBooking,
}) => {
  useEffect(() => {
    getBooking();
  }, []);
  return loading?<h1></h1>:(
    <div>
      { booking && booking.msg ? (
        <h1>{booking.msg}</h1>
      ) : ( 
        booking &&
        booking.timeSlot &&
        user && (
          <h1>
            <Jumbotron fluid>
              <div style={{ textAlign: "center" }}>
                <h1>Booking Details</h1>
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Col md="4">
                    <h4>Player name</h4>
                  </Col>
                  :
                  <Col md="4">
                    <h4>{user.name}</h4>
                  </Col>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Col md="4">
                    <h4>Player CIN</h4>
                  </Col>
                  :
                  <Col md="4">
                    <h4>{user.cin}</h4>
                  </Col>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Col md="4">
                    <h4>Stadium name</h4>
                  </Col>
                  :
                  <Col md="4">
                    <h4>{booking.stadiumName}</h4>
                  </Col>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Col md="4">
                    <h4>Booked day</h4>
                  </Col>
                  :
                  <Col md="4">
                    <h4>{booking.timeSlot.day}</h4>
                  </Col>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Col md="4">
                    <h4>Booked timeslot</h4>
                  </Col>
                  :
                  <Col md="4">
                    <h4>{`from ${booking.timeSlot.from}:00 to ${booking.timeSlot.to}:00`}</h4>
                  </Col>
                </Row>

                <h3>Price : 7 Dt</h3>
              </div>
            </Jumbotron>
            <Link to="/">
              <Button color="danger" onClick={() => deleteBooking(booking._id)}>
                Cancel booking
              </Button>
            </Link>
          </h1>
        )
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  booking: state.bookingReducer,
});

export default connect(mapStateToProps, { getBooking, deleteBooking })(
  MyBooking
);
