import React, { useState } from "react";
import { Button, Collapse, Row, Col, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getTimeslot } from "../redux/actions/timeslotAction";

const DaySlot = ({ day, getTimeslot, id, bookings: { bookings, loading } }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  let date = new Date();
  let hours = date.getHours() + 1;
  let from = hours < 10 ? 10 : hours;
  from = from % 2 ? from + 1 : from;

  let todayTimeSlots = [];
  let futureTimeSlots = [];
  for (let i = from; i < 23; i = i + 2) {
    todayTimeSlots[i] = {
      from: from,
      to: from + 2,
    };
    from += 2;
  }

  for (let i = 10; i < 23; i = i + 2) {
    futureTimeSlots[i] = {
      from: i,
      to: i + 2,
    };
  }

  return loading ? (
    <h1>loading</h1>
  ) : (
    <div>
      <Button
        block
        color="success"
        onClick={toggle}
        style={{
          marginBottom: "1rem",
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {day.verif ? day.name : day}
      </Button>
      <Collapse isOpen={isOpen}>
        {day.verif && hours > 22 ? (
          <Alert color="secondary">
            Sorry , there is not time slots for today
          </Alert>
        ) :  day.verif && !loading ? (
          todayTimeSlots.map((el,i) => (
            <Row style={{ marginBottom: "1rem" }}>
              <Col>From &nbsp;&nbsp;&nbsp;&nbsp;{String(el.from)}:00</Col>
              <Col>
                To &nbsp;&nbsp;&nbsp;&nbsp;
                {String(el.to) === "24" ? "00" : String(el.to)}:00
              </Col>
              <Col>
             {/*   {bookings[i].timeSlot.from === el.from ? (  */}
                  <Button
                    onClick={() =>
                      getTimeslot({
                        day: day.name,
                        from: el.from,
                        to: el.to,
                      })
                    }
                  >
                    <Link
                      to={`/book/${id}`}
                      style={{ textDecoration: "inherit", color: "inherit" }}
                    >
                      Book
                    </Link>
                  </Button>
                {/*  ) : {}} */}
              </Col>
            </Row>
          ))
        )  :(
          !loading &&
          bookings &&
          futureTimeSlots.map((el, i) => (
            <Row style={{ marginBottom: "1rem" }}>
              <Col>From &nbsp;&nbsp;&nbsp;&nbsp;{el.from}:00</Col>
              <Col>To &nbsp;&nbsp;&nbsp;&nbsp;{el.to}:00</Col>
              <Col>
                <Button>
                  <Link
                    to={`/book/${id}`}
                    style={{ textDecoration: "inherit", color: "inherit" }}
                    onClick={() =>
                      getTimeslot({
                        day: day.name ? day.name : day,
                        from: el.from,
                        to: el.to,
                      })
                    }
                  >
                    Book
                  </Link>
                </Button>
              </Col>
            </Row>
          ))
        )}
      </Collapse>
    </div>
  );
};

const mapStateToProps = (state) => ({
  bookings: state.bookingReducer,
});

export default connect(mapStateToProps, { getTimeslot })(DaySlot);
