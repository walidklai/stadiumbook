import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  auth: { isAuth, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !loading && !isAuth ? <Redirect to="/login" /> : <Component {...props} />
    }
  ></Route>
);

const mapStateToProps = (state) => ({
    auth:state.authReducer
});

export default connect(mapStateToProps)(PrivateRoute);
