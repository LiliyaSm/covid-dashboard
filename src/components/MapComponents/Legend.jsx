import React, { useMemo } from 'react';
import 'mapbox-gl-leaflet';
import PropTypes from 'prop-types';
import * as constants from '../../data/constants';

export default function Legend({ boundaries }) {
  const layers = {
    low: `0 - ${boundaries.firstBoundary}`,
    medium: `${boundaries.firstBoundary} - ${boundaries.secondBoundary}`,
    hight: `${boundaries.secondBoundary} and above`,
  };

  const legendKeys = useMemo(() => Object.keys(layers).map((key) => (
    <div key={layers[key] + constants.COLORS[key]}>
      <span style={{ backgroundColor: constants.COLORS[key] }} className="legend-key" />
      <span>{layers[key]}</span>
    </div>
  )));

  return (
    <div>
      <div className="map-overlay" id="legend">
        {legendKeys}
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
