import React, { useState, useContext } from "react";
import "./sign-in.styles.scss";
import Button from "../button/button.component";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/Firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

const defaultFormField = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormField);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormField);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSumbit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      // setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          return alert("Email and password do not match !!");
          break;
        case "auth/user-not-found":
          return alert("Email and password do not match !!");
          break;

        default:
          console.log(error);
          break;
      }
    }
  };
  return (
    <>
      <div className="sign-up-container">
        <h2> Already Have an Account ?</h2>
        <span> Sign In with your Email and Password</span>

        <form onSubmit={handleSumbit}>
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

          <div className="buttons-container">
            <Button type="sumbit">Sign In</Button>
            <Button
              onClick={signInWithGoogle}
              type="button"
              buttonType="google"
            >
              Google Sign In
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
