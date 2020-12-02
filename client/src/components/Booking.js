import React from "react";
import { Button, Col, Jumbotron, Row } from "reactstrap";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { saveBooking, removeBookingData } from "../redux/actions/bookingAction";

const Booking = ({
  user,
  stadium,
  booking,
  bookings,
  loading,
  match,
  saveBooking,
  removeBookingData,
  history,
}) => {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  const handleSubmit = () => {
    const { from, to, day } = booking;
    saveBooking({ from, to, day, id: match.params.id });
    history.push("/");
  };

  return !loading &&
    bookings.find((booking) => booking.timeSlot.from == booking.from) ? (
    <Redirect to="/" />
  ) : !loading&& (
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
            <h4>{stadium.name}</h4>
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
            <h4>{booking.day}</h4>
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
            <h4>{`from ${booking.from}:00 to ${booking.to}:00`}</h4>
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Col md="4">
            <h4>Booking day</h4>
          </Col>
          :
          <Col md="4">
            <h4>{`${day}/${month}/${year}`}</h4>
          </Col>
        </Row>
        <h3>Price : 7 Dt</h3>
        <Button
          color="success"
          style={{ marginRight: "1rem" }}
          onClick={() => handleSubmit()}
        >
          Confirm
        </Button>
        <Link to={`/stadium/${match.params.id}`}>
          <Button color="danger" onClick={() => removeBookingData()}>
            Cancel
          </Button>
        </Link>
      </div>
    </Jumbotron>
  );
};

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
  stadium: state.stadiumReducer.stadium,
  booking: state.bookingReducer.booking,
  bookings: state.bookingReducer.bookings,
  loading: state.bookingReducer.loading,
});

export default connect(mapStateToProps, { saveBooking, removeBookingData })(
  Booking
);
