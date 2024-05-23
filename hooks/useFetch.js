import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchFromEndpoint = async (endpoint) => {
  try {
    const response = await axios.get(endpoint, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const useFetch = ({ endpoint, key }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      const response = await axios.get(
        endpoint,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
          },
        }
      );
      return response.data;
    },
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useFetch;
