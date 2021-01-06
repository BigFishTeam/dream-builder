import React from 'react';
import { Route, Redirect } from 'react-router';
import Util from '../../common/utils/utils';

const { getCookieByKey } = Util;

const AuthRouter = (props: any) => {
  if (!getCookieByKey('JSESSIONID')) {
    return <Route path={props.path} component={props.component} />;
  } else {
    return <Redirect to="/" />;
  }
};

export default AuthRouter;
