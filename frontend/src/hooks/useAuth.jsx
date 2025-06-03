import { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setUser(data.user));
  }, []);

  return user;
}
