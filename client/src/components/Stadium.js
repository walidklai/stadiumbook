import React, { useEffect } from "react";
import DaySlot from "./DaySlot";
import { connect } from "react-redux";
import { getSingleStadium} from "../redux/actions/stadiumAction";
import {getBookings} from '../redux/actions/bookingAction'

const Stadium = ({
  stadiumData: { stadium, loading },
  match,
  getSingleStadium,
  getBookings
}) => {
  useEffect(() => {
    getSingleStadium(match.params.id);
    getBookings()
    console.log(match.params);
  }, []);

  let date = new Date();
  let day = date.getDay();

  function dayName(d) {
    d = d % 7;
    switch (d) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Thursday";
      case 4:
        return "Wednesday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
    }
  }

  return loading ? (
    <h1>Loading</h1>
  ) : (
    !loading && stadium && stadium.address && (
      <div>
        <h1 style={{ marginTop: "3rem", marginBottom: "2rem" }}>
          {stadium.name}
        </h1>
        <img src={String(stadium.image)} />
        <h3>{stadium.address.governorate}</h3>
        <h4>{stadium.address.city}</h4>
        <hr />
        <h2>Day Slots</h2>
        {Array(7)
          .fill(null)
          .map((el, i) => (
            <DaySlot
              key={i}
              day={
                i === 0
                  ? { name: dayName(day + i), verif: "ok" }
                  : dayName(day + i)
              }
              id={match.params.id}
            />
          ))}
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  stadiumData: state.stadiumReducer,
});

export default connect(mapStateToProps, { getSingleStadium ,getBookings})(Stadium);
