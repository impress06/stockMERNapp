import axios from "axios";
import { useSelector } from "react-redux";

function useAxios() {
  const { token } = useSelector((state) => state.auth);

  const axiosPrivateSimpleTokenInsist = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    baseURL:"/api/v1",
    headers: { Authorization: `Token ${token}` },
  });
  const axiosPrivateSimpleTokenFileInsist = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    baseURL:"/api/v1",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  const axiosInvoiceSimpleTokenInsist = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    baseURL:"/api/v1",
    headers: { Authorization: `Token ${token}` },
  });

  const axiosPrivateJWTInsist = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    baseURL:"/api/v1",
    headers: { Authorization: `Bearer ${token}` },
  });

  const axiosPublicInsist = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    baseURL:"/api/v1",
  });

  return {
    axiosPrivateJWTInsist,
    axiosPrivateSimpleTokenInsist,
    axiosPublicInsist,
    axiosPrivateSimpleTokenFileInsist,
  };
}

export default useAxios;
