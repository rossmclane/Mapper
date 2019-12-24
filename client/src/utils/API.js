// import axios from "axios";
import AuthenticatedAxios from "../utils/AuthenticatedAxios";

export default {
  getUserMap: function(id, config) {
    return AuthenticatedAxios.get(`/api/map/${id}`);
  },
  updateUserMap: function(id, data) {
    return AuthenticatedAxios.put(`/api/map/${id}`, data);
  },
  postUserMap: function(data) {
    return AuthenticatedAxios.post(`/api/map`, data);
  },
  getUser: function(username, config) {
    return AuthenticatedAxios.get(`/api/user/${username}`);
  },
  postUser: function(data) {
    return AuthenticatedAxios.post(`/api/user`, data);
  },
  authenticateUser: function(data) {
    return AuthenticatedAxios.post(`api/authenticate`, data);
  }
};
