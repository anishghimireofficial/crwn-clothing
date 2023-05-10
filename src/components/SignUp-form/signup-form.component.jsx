import React, { useState } from "react";
import "./signup-form-styles.scss";
import Button from "../button/button.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/Firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormField);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormField);
  };

  const handleSumbit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if ((error.code = "auth/email-already-in-use")) {
        return alert("Cannot create User,email already in use");
      } else {
        return console.log("User Creation encountered an error", error);
      }
    }
  };
  return (
    <>
      <div className="sign-up-container">
        <h2> Don't Have an Account ?</h2>
        <span> Sign up with your Email and Password</span>

        <form onSubmit={handleSumbit}>
          {/* name  */}

          <FormInput
            label="Display Name"
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
          />
          {/* email */}

          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />

          {/* password  */}

          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />
          {/* confirm password  */}

          <FormInput
            label="Confirm Password"
            type="password"
            required
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
          />
          <Button type="sumbit">Sign up</Button>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
