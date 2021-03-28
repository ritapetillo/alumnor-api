import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";


// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest: any) =>
  axios.get('/');

// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(axios, refreshAuthLogic);

axios.defaults.withCredentials = true;

export default axios;
