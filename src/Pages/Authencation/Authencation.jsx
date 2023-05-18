import React from "react";
import "./Authencation.styles.scss";

import SignUpForm from "../../components/SignUp-form/signup-form.component";
import SignInForm from "../../components/sign-In-Form/sign-in.component";

const Authencation = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authencation;
