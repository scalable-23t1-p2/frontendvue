import axios from "axios";

const reAuthService = {
  getRefresh: async () => {
    const {status, data} = await axios.put('/auth/refresh', {}, {
      withCredentials: true
    });

    if (status === 200) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
      console.log("success reset access token")
    }
  }
}
export default reAuthService;
