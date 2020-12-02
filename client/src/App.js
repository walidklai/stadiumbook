import React, { useEffect } from "react";
import { Container } from "reactstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import {loadUser} from './redux/actions/registerAction'
//COMPONENTS

import NavBarComp from "./components/NavBarComp";
import Stadiums from "./components/Stadiums";
import Login from "./components/Login";
import Register from "./components/Register";
import Stadium from "./components/Stadium";
import Booking from "./components/Booking";
import StadiumAddForm from "./components/StadiumAddForm";
import StadiumEditForm from "./components/StadiumEditForm";
import myStore from './redux/store'
import AlertComp from './components/Alert'
import { setAuthToken } from "./utility/setAuthToken";
import PrivateRoute from './components/PrivateRoute'
import MyBooking from './components/MyBooking'
import MyStadiums from './components/MyStadiums'
import Users from './components/Users'

//////////////////////////////////////////////////

if(localStorage.token)
setAuthToken(localStorage.token)

const App = () => {
  useEffect(()=>{
    myStore.dispatch(loadUser())
  },[])
  return (
    <Provider store={myStore}>
      <Router>
        <NavBarComp />
        <AlertComp/>
        <Container>
          <Switch>
            <Route exact path="/" component={Stadiums} />
            <Route exact path="/search" component={Stadiums} />
            <Route exact path="/search/:governorate" component={Stadiums} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/stadium/:id" component={Stadium} />
            <PrivateRoute exact path="/book/:id" component={Booking} />
            <PrivateRoute exact path="/mystadiums" component={MyStadiums} />
            <PrivateRoute exact path="/stadiumform" component={StadiumAddForm} />
            <PrivateRoute exact path="/stadium/edit/:id" component={StadiumEditForm} />
            <PrivateRoute exact path="/mybooking" component={MyBooking} />
            <PrivateRoute exact path="/adminarea" component={Users} />
          </Switch>
        </Container>
      </Router>
    </Provider>
  );
};

export default App;
