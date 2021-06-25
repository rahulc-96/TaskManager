import { useState, useCallback } from "react";

const useHttpClient = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (request, apply) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(request.url, {
        method: request.method ? request.method : "GET",
        body: request.body ? JSON.stringify(request.body) : null,
        headers: request.headers ? request.headers : {},
      });

      if (!response.ok) {
        throw new Error("Request Failed !!");
      }

      const data = await response.json();
      apply(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message || "Something went wrong !!");
    }
    setIsLoading(false);
  }, []);

  return {
    error,
    isLoading,
    sendRequest,
  };
};

export default useHttpClient;
