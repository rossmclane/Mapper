import axios from "axios";

export default {
  getFeatureCollection: function() {
    return axios.get("/api/features");
  }
};
