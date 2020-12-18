import React from 'react';
import {} from 'mapbox-gl-leaflet';
import PropTypes from 'prop-types';
import * as constants from '../../data/constants';

export default function Legend({ boundaries }) {
  const layers = {
    low: `0 - ${boundaries.firstBoundary}`,
    medium: `${boundaries.firstBoundary} - ${boundaries.secondBoundary}`,
    hight: `${boundaries.secondBoundary} and above`,
  };

  function renderLegend() {
    return Object.keys(layers).map((key) => (
      <div key={layers[key]}>
        <span style={{ backgroundColor: constants.COLORS[key] }} className="legend-key" />
        <span>{layers[key]}</span>
      </div>
    ));
  }

  return (
    <div>
      <div className="map-overlay" id="legend">
        {renderLegend()}
      </div>
    </div>
  );
}

Legend.propTypes = {
  boundaries: PropTypes.objectOf(PropTypes.any),
};

Legend.defaultProps = {
  boundaries: '',
};
