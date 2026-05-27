export const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export const calculateDistanceNM = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 3440.065; // Radius of the earth in nautical miles
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const calculateBearing = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (value: number) => value * (Math.PI / 180);
  const toDeg = (value: number) => value * (180 / Math.PI);

  const startLat = toRad(lat1);
  const endLat = toRad(lat2);
  const dLon = toRad(lon2 - lon1);

  const y = Math.sin(dLon) * Math.cos(endLat);
  const x =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLon);

  return (toDeg(Math.atan2(y, x)) + 360) % 360;
};
