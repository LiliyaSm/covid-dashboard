import React, { useMemo } from 'react';
import 'mapbox-gl-leaflet';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import * as constants from '../../data/constants';

const Legend = React.memo(({ boundaries }) => {
  const { t } = useTranslation();
  const layers = useMemo(
    () => ({
      low: `0 - ${boundaries.firstBoundary}`,
      medium: `${boundaries.firstBoundary} - ${boundaries.secondBoundary}`,
      hight: `${boundaries.secondBoundary} ${t('map.legend')}`,
    }),
    [boundaries, t],
  );

  const legendKeys = useMemo(() => {
    const layersArray = Object.keys(layers);
    return layersArray.map((key) => (
      <div key={layers[key] + constants.COLORS[key]}>
        <span style={{ backgroundColor: constants.COLORS[key] }} className="legend-key" />
        <span>{layers[key]}</span>
      </div>
    ));
  }, [layers]);

  return (
    <div>
      <div className="map-overlay" id="legend">
        {legendKeys}
      </div>
    </div>
  );
});

Legend.propTypes = {
  boundaries: PropTypes.objectOf(PropTypes.any),
};

Legend.defaultProps = {
  boundaries: '',
};

export default Legend;
