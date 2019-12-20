import statesData from "../../rainfall";
import React from "react";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import "./style.css";

class RegionMap extends React.Component {
  state = {
    lat: 38.5,
    lng: -98.0,
    zoom: 4
  };

  calculateWeighting = feature => {
    console.log(this.props.datasets[0]);

    var usedDatasets = this.props.datasets.filter(
      dataset => dataset.checked === true
    );

    if (usedDatasets.length === 0) {
      return null;
    } else {
      var final = usedDatasets
        .map(dataset => feature.properties[dataset.name])
        .reduce((acc, current) => acc + current);
      return final;
    }
  };

  geoJSONStyle = feature => {
    return {
      color: "#1f2021",
      weight: 1,
      fillOpacity: 0.7,
      fillColor: this.calculateWeighting(feature)
        ? this.getColor(this.calculateWeighting(feature))
        : "#FFEDA0"
    };
  };

  getColor(d) {
    return d > 1000
      ? "#800026"
      : d > 500
      ? "#BD0026"
      : d > 200
      ? "#E31A1C"
      : d > 100
      ? "#FC4E2A"
      : d > 50
      ? "#FD8D3C"
      : d > 20
      ? "#FEB24C"
      : d > 10
      ? "#FED976"
      : "#FFEDA0";
  }

  resetHighlight(e) {
    var layer = e.target;
    layer.setStyle({
      color: "#1f2021",
      weight: 1,
      fillOpacity: 0.7
    });
  }

  highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      weight: 2,
      color: "#000000",
      dashArray: "",
      fillOpacity: 0.7
    });
  }

  onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight
    });
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={statesData}
          style={this.geoJSONStyle}
          onEachFeature={this.onEachFeature}
        />
      </Map>
    );
  }
}

export default RegionMap;
