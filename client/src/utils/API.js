import axios from "axios";

export default {
  getUserMap: function(id) {
    return axios.get(`/api/map/${id}`);
  },
  updateUserMap: function(id, data) {
    return axios.put(`/api/map/${id}`, data);
  },
  postUserMap: function(username, data) {
    return axios.post(`/api/user/${username}/map`, data);
  },
  getUser: function(username) {
    return axios.get(`/api/user/${username}`);
  },
  postUser: function(username) {
    return axios.post(`/api/user/${username}`);
  }
};
