// src/pages/admin/AdminLoginPage.js
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import React from "react";
import Header from "../../../features/Header/Header";

import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import "./AdminLogin.css";

const SIGNUP_GOOGLE = gql`
  mutation SignUpGoogle($accessToken: String!) {
    signUpGoogle(accessToken: $accessToken) {
      accessToken
      user {
        email
        id
        firstName
        lastName
      }
    }
  }
`;

const AdminLoginPage = () => {
  const [signupGoogle, { loading: createLoading, error: createError }] =
    useMutation(SIGNUP_GOOGLE, {});

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      const jwtToken = await signupGoogle({
        variables: {
          accessToken: response.access_token,
        },
      });
      console.log("Login Successfull", jwtToken?.data?.signUpGoogle);
      localStorage.setItem(
        "accessToken",
        jwtToken?.data?.signUpGoogle?.accessToken
      );
      localStorage.setItem(
        "user",
        JSON.stringify(jwtToken?.data?.signUpGoogle?.user)
      );
      window.location.reload();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <Header />
      <div className='admin-login-page'>
        <h2>Admin Login</h2>
        <button className='google-login-button' onClick={handleGoogleLogin}>
          <FcGoogle className='google-icon' />
          <span>Login with Google</span>
        </button>
      </div>
    </>
  );
};

export default AdminLoginPage;
