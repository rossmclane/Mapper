import axios from "axios";

export default {
  getUserMap: function(id, config) {
    return axios.get(`/api/map/${id}`, config);
  },
  updateUserMap: function(id, data) {
    return axios.put(`/api/map/${id}`, data);
  },
  postUserMap: function(username, data, config) {
    return axios.post(`/api/user/${username}/map`, data, config);
  },
  getUser: function(username, config) {
    return axios.get(`/api/user/${username}`, config);
  },
  postUser: function(data) {
    return axios.post(`/api/user`, data);
  },
  authenticateUser: function(data) {
    return axios.post(`api/authenticate`, data);
  }
};
