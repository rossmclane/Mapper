// import axios from "axios";
import axios from "axios";

function genAxios() {
  return axios.create({
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });
}

export default {
  getUserMap: function(id) {
    return genAxios().get(`/api/map/${id}`);
  },
  updateUserMap: function(id, data) {
    return genAxios().put(`/api/map/${id}`, data);
  },
  postUserMap: function(data) {
    return genAxios().post(`/api/map`, data);
  },
  getUser: function(username) {
    return genAxios().get(`/api/user/${username}`);
  },
  postUser: function(data) {
    return genAxios().post(`/api/user`, data);
  },
  authenticateUser: function(data) {
    return genAxios().post(`api/authenticate`, data);
  }
};
