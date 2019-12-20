import axios from "axios";

export default {
  getUserMap: function(id) {
    return axios.get(`/api/map/${id}`);
  },
  postUserMap: function(username, data) {
    return axios.post(`/user/${username}/map`, data);
  }
};
