import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import React, { useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./Header.css";

const CheckLoginQuery = gql`
  query CheckLogin {
    checkLogin {
      id
      email
      firstName
      lastName
    }
  }
`;

const Header = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToHome = () => {
    navigate("/admin/");
  };

  const handleUploadClick = () => {
    navigate("/admin/upload");
  };

  const { loading, error, data } = useQuery(CheckLoginQuery);

  const response = data?.checkLogin;
  let firstName = response?.firstName,
    lastName = response?.lastName;

  const showUploadBtn = useMemo(() => {
    return (
      location.pathname !== "/admin/upload" &&
      location.pathname !== "/admin/login"
    );
  }, [location.pathname]);

  useEffect(() => {
    if (!loading && !response) {
      navigate("/admin/login");
    }

    if (!loading && response && location.pathname === "/admin/login") {
      console.log("Data", response.data);
      navigate("/admin/");
    }

    // console.log(location);
  }, [loading, response]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <header>
      <div className='container mx-auto py-4 flex justify-between items-center'>
        <h1 onClick={navigateToHome} className='text-2xl font-bold logo'>
          Streamify Admin Panel
        </h1>
        <div className='flex items-center'>
          {!!showUploadBtn && (
            <button onClick={handleUploadClick} className='btn-upload'>
              Upload Video
            </button>
          )}
          <div className='text-lg'>
            {firstName && lastName ? (
              <span className='mr-2'>
                Welcome, {firstName} {lastName}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
