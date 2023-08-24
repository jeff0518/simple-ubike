import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function clientSidePageGuards() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        window.location.href = "/auth";
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
}
