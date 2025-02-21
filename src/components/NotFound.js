import React, { useState } from "react";

const NotFound = () => {


  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100 vh-100 text-center bg-light">
      <h1 className="display-1 text-danger fw-bold">404</h1>
      <h2 className="mb-4 text-dark">Page Not Found</h2>
      <p className="text-muted">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="btn btn-primary mt-3">Go Back Home</a>
      

    </div>
  );
};

export default NotFound;
