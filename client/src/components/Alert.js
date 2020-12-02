import React from "react";
import { Alert } from "reactstrap";
import { connect } from "react-redux";

const AlertComp = ({ alert }) => 
  alert!==null&&alert.length>0&&alert.map((alert) => (
      <div>
        <Alert key={alert.id}color={alert.alertType}>{alert.msg}</Alert>
      </div>
    ));
  

const mapStateToPops = (state) => (
  {alert: state.alertReducer}
);

export default connect(mapStateToPops)(AlertComp);
