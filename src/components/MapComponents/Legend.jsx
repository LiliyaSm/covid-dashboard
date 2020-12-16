// import { useEffect } from 'react';
// import { useMap } from 'react-leaflet';
// import L from 'leaflet';
import {} from 'mapbox-gl-leaflet';
import * as constants from '../../data/constants';

export default function Legend({ boundaries }) {
  console.log(boundaries);
  const layers = {
    low: `0-${boundaries.firstBoundary}`,
    medium: `${boundaries.firstBoundary}-${boundaries.secondBoundary}`,
    hight: `${boundaries.secondBoundary}+`,
  };

  function createLegend() {
    return Object.keys(layers).map((key, i) => {
      return (
        <div>
          <span style={{ backgroundColor: constants.COLORS[key] }} className="legend-key"></span>
          <span key={layers[key]}>{layers[key]}</span>
        </div>
      );
    });
  }

  return (
    <div>
      <div class="map-overlay" id="features">
        <h2>US population density</h2>
        <div id="pd">
          <p>Hover over a state!</p>
        </div>
      </div>
      <div class="map-overlay" id="legend">
        {createLegend()}
      </div>
    </div>
  );
}
