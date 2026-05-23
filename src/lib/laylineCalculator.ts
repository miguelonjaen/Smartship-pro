/**
 * Layline Calculator Utility
 * Calculates optimal sailing angle to waypoint and detects deviation
 */

export interface LaylineData {
  optimalBearing: number;        // True bearing to waypoint (0-359°)
  currentCOG: number;             // Current course over ground
  deviation: number;              // Deviation in degrees (-180 to 180)
  isDeviated: boolean;            // True if deviation exceeds threshold
  deviationPercentage: number;    // Deviation as percentage of acceptable range
  windOptimalAngle: number;       // Optimal sailing angle relative to wind
  apparentWind: number;           // Current apparent wind angle
  isOffLayline: boolean;          // True if significantly off layline
}

export interface AnchorWatchData {
  isAnchored: boolean;
  anchorLat?: number;
  anchorLng?: number;
  currentLat: number;
  currentLng: number;
  driftDistance: number;          // in meters
  driftBearing: number;           // Direction of drift (0-359°)
  isDrifting: boolean;            // True if drift exceeds threshold
  driftThreshold: number;          // Alarm threshold in meters
}

/**
 * Calculate layline deviation
 * Optimal angle to waypoint vs current course
 * 
 * @param currentLat - Current latitude
 * @param currentLng - Current longitude
 * @param waypointLat - Destination latitude
 * @param waypointLng - Destination longitude
 * @param currentCOG - Current course over ground (0-359°)
 * @param windDir - Wind direction (0-359°)
 * @param sog - Speed over ground in knots
 * @param deviationThreshold - Alarm threshold in degrees (default 15°)
 * @returns LaylineData object
 */
export function calculateLaylineDeviation(
  currentLat: number,
  currentLng: number,
  waypointLat: number,
  waypointLng: number,
  currentCOG: number,
  windDir: number,
  sog: number,
  deviationThreshold: number = 15
): LaylineData {
  // Calculate true bearing to waypoint
  const optimalBearing = calculateBearing(
    currentLat,
    currentLng,
    waypointLat,
    waypointLng
  );

  // Calculate deviation (shortest angle difference)
  let deviation = optimalBearing - currentCOG;
  
  // Normalize to -180 to 180 range
  if (deviation > 180) {
    deviation -= 360;
  } else if (deviation < -180) {
    deviation += 360;
  }

  // Calculate deviation as percentage of acceptable range
  const deviationPercentage = Math.abs(deviation) / deviationThreshold;
  const isDeviated = Math.abs(deviation) > deviationThreshold;

  // Calculate optimal sailing angle relative to wind (for sailboats)
  // Optimal is typically 22-35° from apparent wind
  const apparentWind = (windDir - currentCOG + 360) % 360;
  const windOptimalAngle = apparentWind > 180 ? apparentWind - 360 : apparentWind;

  // Check if significantly off layline (more than 2x threshold)
  const isOffLayline = Math.abs(deviation) > deviationThreshold * 2;

  return {
    optimalBearing,
    currentCOG,
    deviation,
    isDeviated,
    deviationPercentage,
    windOptimalAngle,
    apparentWind,
    isOffLayline
  };
}

/**
 * Calculate anchor watch drift
 * Monitors if vessel has drifted beyond acceptable radius
 * 
 * @param anchorLat - Anchor position latitude
 * @param anchorLng - Anchor position longitude
 * @param currentLat - Current latitude
 * @param currentLng - Current longitude
 * @param driftThreshold - Alarm threshold in meters (default 200m)
 * @returns AnchorWatchData object
 */
export function calculateAnchorDrift(
  anchorLat: number,
  anchorLng: number,
  currentLat: number,
  currentLng: number,
  driftThreshold: number = 200
): AnchorWatchData {
  // Calculate distance using Haversine
  const distance = calculateDistance(anchorLat, anchorLng, currentLat, currentLng);
  const driftDistanceMeters = distance * 1852; // Convert nautical miles to meters

  // Calculate bearing of drift
  const driftBearing = calculateBearing(
    anchorLat,
    anchorLng,
    currentLat,
    currentLng
  );

  const isDrifting = driftDistanceMeters > driftThreshold;

  return {
    isAnchored: true,
    anchorLat,
    anchorLng,
    currentLat,
    currentLng,
    driftDistance: driftDistanceMeters,
    driftBearing,
    isDrifting,
    driftThreshold
  };
}

/**
 * Calculate bearing between two points
 * @returns bearing in degrees (0-359°)
 */
export function calculateBearing(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const dLng = ((lng2 - lng1 + 180) % 360) - 180;
  const y = Math.sin((dLng * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180);
  const x =
    Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
    Math.sin((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.cos((dLng * Math.PI) / 180);

  let bearing = (Math.atan2(y, x) * 180) / Math.PI;
  bearing = (bearing + 360) % 360; // Normalize to 0-359
  return bearing;
}

/**
 * Calculate distance between two points (Haversine)
 * @returns distance in nautical miles
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance * 0.539957; // Convert to nautical miles
}

/**
 * Calculate ETA based on distance and speed
 * @param distanceNM - Distance in nautical miles
 * @param speedKnots - Speed in knots
 * @returns ETA string in ISO format, or null if invalid inputs
 */
export function calculateETA(distanceNM: number, speedKnots: number): string | null {
  if (speedKnots <= 0 || distanceNM <= 0) {
    return null;
  }

  // Calculate time in hours
  const hours = distanceNM / speedKnots;
  
  // Add to current time
  const now = new Date();
  const eta = new Date(now.getTime() + hours * 60 * 60 * 1000);

  return eta.toISOString();
}
