import React, { useCallback } from 'react';
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

const Charts = ({ chartsList }) => {
  const customizeTooltip = useCallback((pointInfo) => ({
    text: `${pointInfo.argumentText}<br/>${pointInfo.value.toLocaleString('ru')}`,
  }));

  return (
    <Chart dataSource={chartsList}>
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
      <Tooltip enabled customizeTooltip={customizeTooltip} />
    </Chart>
  );
};

Charts.propTypes = {
  chartsList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Charts;
