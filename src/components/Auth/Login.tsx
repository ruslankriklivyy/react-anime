import React from 'react';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';

import validateForm from '../../utils/validate';

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <Field type="email" name="email" placeholder="E-mail" />
      {touched.email && errors.email && <span>{errors.email}</span>}
      <Field type="password" name="password" placeholder="Password" />
      {touched.password && errors.password && <span>{errors.password}</span>}
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
      <a href="https://kitsu.io/settings/profile">Register now</a>
    </Form>
  );
};

interface MyFormProps {
  initialEmail?: string;
  onSendUser: (email: string, password: string) => void;
  toggleVisibleAuth: () => void;
}

const Login = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      email: props.initialEmail || '',
      password: '',
    };
  },

  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    let isAuth = true;

    validateForm(isAuth, errors, values);

    return errors;
  },

  handleSubmit: (values, { props, resetForm }) => {
    props.onSendUser(values.email, values.password);
    resetForm();
    props.toggleVisibleAuth();
  },
})(LoginForm);

export default Login;
