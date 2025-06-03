import React from "react";

export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return <button onClick={handleLogout}>Logout</button>;
}
