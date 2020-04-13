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
    maxZoomLevel: 14,
    minZoomLevel: 5,
  };
};

/**
 * @returns a Mapbox layer showing POI density at the given hour
 */
export const getPoiLayer = (layerId) => ({
  id: layerId,
  sourceID: 'poi',
  sourceLayerID: 'poi',
  minZoomLevel: 5,
  belowLayerId: 'road-label',
  style: {
    'fillOpacity': 0.9,
    'fillColor': '#FF00FF'
  },
});
