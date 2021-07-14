import React, { useEffect } from "react";
import {
  getUserWithCookie
} from "../../store/actions/AuthActions";
import { connect } from "react-redux";
import {useHistory} from "react-router-dom";

function LoginSuccess(props) {
  const history = useHistory();
  useEffect(() => {
    props.getUserWithCookie()
    history.push('/profile')
    // setTimeout(() => {
    //   window.close();
    // }, 1000);
  }, []);

  return <div>Thanks for loggin in!</div>;
}

const mapStateToProps = (state) => ({
  auth: state.auth
});
export default connect(mapStateToProps, {
  getUserWithCookie,
})(LoginSuccess);