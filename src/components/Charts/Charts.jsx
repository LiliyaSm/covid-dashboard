import React, { useCallback, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Chart, {
  ArgumentAxis,
  Series,
  CommonSeriesSettings,
  CommonAxisSettings,
  Grid,
  Label,
  Format,
  ValueAxis,
  Tooltip,
} from 'devextreme-react/chart';
import './Charts.scss';
import { CommonContext } from '../../Providers/CommonProvider';
import ExpandBtn from '../ExpandBtn/ExpandBtn';

const Charts = ({ chartsList }) => {
  const { currentCountry } = useContext(CommonContext);
  const [isFullScreenSize, setIsFullScreenSize] = useState(false);

  const customizeTooltip = useCallback((pointInfo) => ({
    text: `${pointInfo.argumentText}<br/>${pointInfo.value.toLocaleString('ru')}`,
  }));

  const size = useMemo(
    () => (isFullScreenSize ? { height: '100%', width: '100%' } : { height: '400', width: '400' }),
    [isFullScreenSize],
  );

  return (
    <div className={isFullScreenSize ? 'chart-container full-container' : 'chart-container'}>
      <ExpandBtn setIsFullScreenSize={setIsFullScreenSize} isFullScreenSize={isFullScreenSize} />
      <Chart dataSource={chartsList} title={currentCountry.name ?? 'World'} theme="generic.darkmoon" size={size}>
        <CommonSeriesSettings argumentField="data" type="spline" />
        <CommonAxisSettings>
          <Grid />
        </CommonAxisSettings>
        <Series valueField="deaths" name="Deaths" />
        <Series valueField="recovered" name="Recovered" />
        <Series valueField="cases" name="Cases" />
        <ArgumentAxis>
          <Label>
            <Format type="string" />
          </Label>
        </ArgumentAxis>
        <ValueAxis allowDecimals>
          <Label>
            <Format type="decimal" />
          </Label>
        </ValueAxis>
        <Tooltip enabled customizeTooltip={customizeTooltip} zIndex="101" />
      </Chart>
    </div>
  );
};

Charts.propTypes = {
  chartsList: PropTypes.arrayOf(PropTypes.object),
};

Charts.defaultProps = {
  chartsList: [],
};
export default Charts;
