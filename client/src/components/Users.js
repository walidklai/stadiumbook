import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { getUsers } from "../redux/actions/registerAction";

const Users = ({ getUsers, usersData: { users, loading } }) => {
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      {!loading &&
        users &&
        users.map((user) => (
          <div>
            <h1>{user.name}</h1>
            <Button color="danger" onClick={()=>console.log('click')}>Delete</Button>
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  usersData: state.authReducer,
});

export default connect(mapStateToProps, { getUsers })(Users);
