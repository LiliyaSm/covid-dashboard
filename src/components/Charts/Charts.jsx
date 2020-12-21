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
import { CommonContext } from '../../Providers/CommonProvider';
import ExpandBtn from '../ExpandBtn/ExpandBtn';
import { WHOLE_WORLD_NAME } from '../../data/constants';
import { countFor100 } from '../../helpers/helpers';
import './Charts.scss';

const Charts = ({ chartsList }) => {
  const { currentCountry, isFor100, population } = useContext(CommonContext);
  const [isFullScreenSize, setIsFullScreenSize] = useState(false);

  const dataWithPer100 = useMemo(() => {
    const populationCount = currentCountry.name === WHOLE_WORLD_NAME ? population : currentCountry.population;
    return chartsList.map((item) => ({
      ...item,
      casesIsFor100: countFor100(item.cases, populationCount),
      deathsIsFor100: countFor100(item.deaths, populationCount),
      recoveredIsFor100: countFor100(item.recovered, populationCount),
    }));
  }, [chartsList, currentCountry, population]);

  const customizeTooltip = useCallback((pointInfo) => ({
    text: `${pointInfo.argumentText}<br/>${pointInfo.value.toLocaleString('ru')}`,
  }));

  const size = useMemo(() => (isFullScreenSize ? { height: '100%', width: '100%' } : { height: '400', width: '400' }), [
    isFullScreenSize,
  ]);

  return (
    <div className={isFullScreenSize ? 'chart-container full-container' : 'chart-container'}>
      <ExpandBtn setIsFullScreenSize={setIsFullScreenSize} isFullScreenSize={isFullScreenSize} />
      <Chart
        dataSource={dataWithPer100}
        title={currentCountry.name ?? WHOLE_WORLD_NAME}
        theme="generic.darkmoon"
        size={size}
      >
        <CommonSeriesSettings argumentField="data" type="spline" />
        <CommonAxisSettings>
          <Grid />
        </CommonAxisSettings>
        <Series valueField={isFor100 ? 'casesIsFor100' : 'cases'} name="Cases" />
        <Series valueField={isFor100 ? 'deathsIsFor100' : 'deaths'} name="Deaths" />
        <Series valueField={isFor100 ? 'recoveredIsFor100' : 'recovered'} name="Recovered" />
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
