import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const Signout = (props) => {
  useEffect(() => {
    props.signOut();
  });

  return <div>Sorry to see you go</div>;
};

export default connect(null, actions)(Signout);
