import React, { useCallback, useState, useMemo } from 'react';
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
import { useTranslation } from 'react-i18next';
import ExpandBtn from '../ExpandBtn/ExpandBtn';
import { countFor100 } from '../../helpers/helpers';
import './Charts.scss';

const Charts = React.memo(({ chartsList, countryName, isFor100, population, countryPopulation, isLastDay }) => {
  const { t } = useTranslation();
  const [isFullScreenSize, setIsFullScreenSize] = useState(false);

  const dataWithPer100 = useMemo(() => {
    const populationCount = countryName ? countryPopulation : population;
    let chartsListForPeriod = [];

    if (isLastDay) {
      for (let i = 1; i < chartsList.length; i++) {
        const getDiff = (value) => chartsList[i][value] - chartsList[i - 1][value];
        const cases = getDiff('cases');
        const deaths = getDiff('deaths');
        const recovered = getDiff('recovered');
        if (cases >= 0 && deaths >= 0 && recovered >= 0) {
          chartsListForPeriod.push({
            ...chartsList[i],
            cases,
            deaths,
            recovered,
          });
        }
      }
    } else {
      chartsListForPeriod = chartsList;
    }
    return chartsListForPeriod?.map((item) => ({
      ...item,
      casesIsFor100: countFor100(item.cases, populationCount),
      deathsIsFor100: countFor100(item.deaths, populationCount),
      recoveredIsFor100: countFor100(item.recovered, populationCount),
    }));
  }, [chartsList, countryName, population, isLastDay, countryPopulation]);

  const customizeTooltip = useCallback((pointInfo) => ({
    text: `${pointInfo.argumentText}<br/>${pointInfo.value.toLocaleString('ru')}`,
  }));

  const size = useMemo(() => (isFullScreenSize ? { height: '100%', width: '100%' } : { height: '350', width: '350' }), [
    isFullScreenSize,
  ]);

  return (
    <div className={isFullScreenSize ? 'chart-container full-container' : 'chart-container'}>
      <ExpandBtn setIsFullScreenSize={setIsFullScreenSize} isFullScreenSize={isFullScreenSize} />
      <Chart
        dataSource={dataWithPer100}
        title={countryName ?? t('whole-world-name')}
        theme="generic.darkmoon"
        size={size}
      >
        <CommonSeriesSettings argumentField="data" type="spline" />
        <CommonAxisSettings>
          <Grid />
        </CommonAxisSettings>
        <Series valueField={isFor100 ? 'casesIsFor100' : 'cases'} name={t('chart.cases')} />
        <Series valueField={isFor100 ? 'deathsIsFor100' : 'deaths'} name={t('chart.deaths')} />
        <Series valueField={isFor100 ? 'recoveredIsFor100' : 'recovered'} name={t('chart.recovered')} />
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
});

Charts.propTypes = {
  chartsList: PropTypes.arrayOf(PropTypes.object),
  countryName: PropTypes.string,
  isFor100: PropTypes.bool.isRequired,
  isLastDay: PropTypes.bool.isRequired,
  population: PropTypes.number.isRequired,
  countryPopulation: PropTypes.number.isRequired,
};

Charts.defaultProps = {
  chartsList: [],
  countryName: null,
};

export default Charts;
