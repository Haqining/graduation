import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Personal from './Personal';
import PersonalSetting from './PersonalSetting/PersonalSetting';

export default class Index extends Component {
  render() {
    const {
      match: { url }
    } = this.props;
    return (
      <Switch>
        <Route exact path={`${url}/`} component={Personal} />
        <Route exact path={`${url}/setting`} component={PersonalSetting} />
      </Switch>
    );
  }
}
