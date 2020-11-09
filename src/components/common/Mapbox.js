import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Mapbox = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(0.75);
  const bounds = [
    [-32, -18],
    [32, 14],
  ];

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/maryam543/ckh95pmzl21jd19n64jww9v1x',
      center: [lng, lat],
      zoom: zoom,
      maxBounds: bounds,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    // Add navigation control (scale)
    var scale = new mapboxgl.ScaleControl({
      maxWidth: 100,
      unit: 'imperial',
    });
    map.addControl(scale);

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="">
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>

      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Mapbox;