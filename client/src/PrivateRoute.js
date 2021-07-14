import Cookies from "js-cookie";
import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // s%3AsXvqET_i_5IuqPEmr1Hmu6c4eeL6JNCM.rAP859Y%2BAt%2BETIv%2Bf%2Bx%2B9Z3Mo8QOYbO6%2Bh75O1HHlVo

  return (
    <Route
      {...rest}
      render={(props) =>
        (Cookies.get("connect.sid") != undefined) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
