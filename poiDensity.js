import { colors, hours } from './constants';

/**
 * @returns a Mapbox source for POI density by hour
 */
export const getPoiSource = () => {
  const params = new URLSearchParams({
    columns: hours
      .map((hour) => `(countsnz_by_hour->'${hour}')::double precision as countsnz${hour}`)
      .join(','),
    layer: 'poi',
  });

  return {
    tileUrlTemplates: [`https://10.32.16.108/v1/mvt/t_safegraph_core_pois/{z}/{x}/{y}?${params.toString()}`],
    onPress: (e) => { console.log(`VectorSource onPress: ${e.features}`, e.features) }
  };
};

/**
 * @returns a Mapbox layer showing POI density at the given hour
 */
export const getPoiLayer = (hour) => ({
  belowLayerID: 'road-label',
  maxZoomLevel: 5,
  style: {
    'fillColor': [
      'interpolate',
      ['linear'],
      ['number', ['get', `countsnz${hour}`], 0],
      ...colors.flat(),
    ]
  },
});
