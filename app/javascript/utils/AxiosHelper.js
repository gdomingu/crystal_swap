import axios from "axios";
const AxiosHelper = () => {
  const csrfToken = document.querySelector("[name=csrf-token]").content;
  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Accept"] = "application/json";
};
export default AxiosHelper;
