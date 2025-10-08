import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin } = useAuth();
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToAdmin = () => {
    navigate("/admin");
  };

  const handleUploadClick = () => {
    navigate("/admin/upload");
  };

  const showAdminComponent = useMemo(() => {
    return (
      !location.pathname.includes("/admin") &&
      !location.pathname.includes("/login") &&
      isAdmin
    );
  }, [location, isAdmin]);

  const showUploadBtn = useMemo(() => {
    return location.pathname.includes("/admin") && isAdmin;
  }, [location.pathname, isAdmin]);

  return (
    <header>
      <div className='container mx-auto py-4 flex justify-between items-center'>
        <h1 onClick={navigateToHome} className='text-2xl font-bold logo'>
          Streamify
        </h1>
        <div className='flex items-center'>
          {!!showAdminComponent && (
            <button onClick={navigateToAdmin} className='btn-upload'>
              Admin
            </button>
          )}
          {!!showUploadBtn && (
            <button onClick={handleUploadClick} className='btn-upload'>
              Upload Videos
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
