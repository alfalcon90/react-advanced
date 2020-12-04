import React from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

const Signin = (props) => {
  const onSubmit = (formProps) => {
    props.signIn(formProps, () => {
      props.history.push('/feature');
    });
  };

  const validate = () => {};

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <Field
            name="email"
            type="text"
            component="input"
            placeholder="Email"
          />
          <label>Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            placeholder="First Name"
          />
          <div>{props.errorMsg}</div>
          <button type="submit">Sign In</button>
        </form>
      )}
    />
  );
};

const mapStateToProps = (state) => {
  return { errorMsg: state.auth.errorMsg };
};

export default connect(mapStateToProps, actions)(Signin);
