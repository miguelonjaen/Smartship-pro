/**
 * Sail Polars Database
 * Defines theoretical VMG (Velocity Made Good) and optimal sailing angles
 * across different wind conditions and sail configurations
 * 
 * Data structure: Wind strength → Sail configuration → Performance metrics
 */

export interface SailPolarConfig {
  optimalTWA: number;      // Optimal True Wind Angle in degrees (0-180°)
  maxVMG: number;          // Maximum Velocity Made Good in knots
  maxSOG: number;          // Maximum Speed Over Ground in knots
  vmgRange: [number, number];  // Min/max VMG range for this config
}

export interface SailPolarSet {
  [sailConfig: string]: SailPolarConfig;
}

export interface SailPolarDatabase {
  [windStrength: string]: SailPolarSet;
}

/**
 * Professional racing sailboat polars (typical 40-50ft monohull)
 * Based on: IMS/ORC rating data, typical E-tech racing mainsail + jib
 * 
 * Wind strengths:
 * - lightAir: 0-5 knots (bonanza - muy ligero)
 * - light: 5-8 knots (ligero)
 * - moderate: 8-14 knots (fresco)
 * - strong: 14-20 knots (temporal moderado)
 * - veryStrong: 20-28 knots (temporal)
 * - gale: 28+ knots (vendaval)
 */
export const SAIL_POLARS: SailPolarDatabase = {
  // Light air: 0-5 knots
  lightAir: {
    full: {
      optimalTWA: 25,
      maxVMG: 2.8,
      maxSOG: 3.2,
      vmgRange: [2.0, 3.2]
    },
    working: {
      optimalTWA: 28,
      maxVMG: 2.5,
      maxSOG: 3.0,
      vmgRange: [1.8, 3.0]
    },
    storm_jib: {
      optimalTWA: 32,
      maxVMG: 1.9,
      maxSOG: 2.2,
      vmgRange: [1.2, 2.2]
    }
  },

  // Light: 5-8 knots
  light: {
    full: {
      optimalTWA: 24,
      maxVMG: 4.2,
      maxSOG: 5.1,
      vmgRange: [3.5, 5.1]
    },
    working: {
      optimalTWA: 26,
      maxVMG: 4.0,
      maxSOG: 4.9,
      vmgRange: [3.3, 4.9]
    },
    storm_jib: {
      optimalTWA: 30,
      maxVMG: 3.2,
      maxSOG: 3.8,
      vmgRange: [2.5, 3.8]
    }
  },

  // Moderate: 8-14 knots (fresco - ideal racing conditions)
  moderate: {
    full: {
      optimalTWA: 22,
      maxVMG: 6.8,
      maxSOG: 8.2,
      vmgRange: [5.5, 8.2]
    },
    reef1: {
      optimalTWA: 20,
      maxVMG: 6.5,
      maxSOG: 8.0,
      vmgRange: [5.3, 8.0]
    },
    working: {
      optimalTWA: 24,
      maxVMG: 6.3,
      maxSOG: 7.8,
      vmgRange: [5.0, 7.8]
    },
    storm_jib: {
      optimalTWA: 28,
      maxVMG: 5.1,
      maxSOG: 6.2,
      vmgRange: [4.0, 6.2]
    }
  },

  // Strong: 14-20 knots (temporal moderado)
  strong: {
    reef1: {
      optimalTWA: 18,
      maxVMG: 8.2,
      maxSOG: 10.0,
      vmgRange: [6.5, 10.0]
    },
    reef2: {
      optimalTWA: 16,
      maxVMG: 7.9,
      maxSOG: 9.6,
      vmgRange: [6.2, 9.6]
    },
    working: {
      optimalTWA: 22,
      maxVMG: 7.5,
      maxSOG: 9.2,
      vmgRange: [5.8, 9.2]
    },
    storm_jib: {
      optimalTWA: 26,
      maxVMG: 6.8,
      maxSOG: 8.3,
      vmgRange: [5.2, 8.3]
    }
  },

  // Very Strong: 20-28 knots (temporal fuerte)
  veryStrong: {
    reef2: {
      optimalTWA: 14,
      maxVMG: 9.2,
      maxSOG: 11.5,
      vmgRange: [7.0, 11.5]
    },
    reef3: {
      optimalTWA: 12,
      maxVMG: 8.8,
      maxSOG: 11.0,
      vmgRange: [6.6, 11.0]
    },
    storm_jib: {
      optimalTWA: 24,
      maxVMG: 7.9,
      maxSOG: 9.8,
      vmgRange: [6.0, 9.8]
    }
  },

  // Gale: 28+ knots (vendaval)
  gale: {
    reef3: {
      optimalTWA: 10,
      maxVMG: 9.5,
      maxSOG: 12.0,
      vmgRange: [7.0, 12.0]
    },
    trysail: {
      optimalTWA: 8,
      maxVMG: 8.0,
      maxSOG: 10.0,
      vmgRange: [5.5, 10.0]
    },
    storm_jib: {
      optimalTWA: 22,
      maxVMG: 8.2,
      maxSOG: 10.5,
      vmgRange: [6.0, 10.5]
    }
  }
};

/**
 * Map numeric wind speed to polar database key
 * @param windSpeedKnots - Wind speed in knots
 * @returns Wind condition category key
 */
export function getWindConditionCategory(windSpeedKnots: number): keyof typeof SAIL_POLARS {
  if (windSpeedKnots < 5) return 'lightAir';
  if (windSpeedKnots < 8) return 'light';
  if (windSpeedKnots < 14) return 'moderate';
  if (windSpeedKnots < 20) return 'strong';
  if (windSpeedKnots < 28) return 'veryStrong';
  return 'gale';
}

/**
 * Get recommended sail configuration based on wind speed
 * @param windSpeedKnots - Wind speed in knots
 * @returns Recommended sail configuration name
 */
export function getRecommendedSailConfig(windSpeedKnots: number): string {
  if (windSpeedKnots < 5) return 'full';
  if (windSpeedKnots < 8) return 'full';
  if (windSpeedKnots < 12) return 'full';
  if (windSpeedKnots < 16) return 'reef1';
  if (windSpeedKnots < 22) return 'reef2';
  if (windSpeedKnots < 28) return 'reef3';
  return 'trysail';
}

/**
 * Calculate VMG gain from changing sail configuration
 * @param currentWindSpeed - Current wind speed in knots
 * @param currentConfig - Current sail configuration
 * @param targetConfig - Target sail configuration
 * @returns VMG gain in knots (positive = improvement)
 */
export function calculateSailConfigVMGGain(
  currentWindSpeed: number,
  currentConfig: string,
  targetConfig: string
): number {
  const category = getWindConditionCategory(currentWindSpeed);
  const polars = SAIL_POLARS[category];

  if (!polars[currentConfig] || !polars[targetConfig]) {
    return 0; // Invalid configurations
  }

  const currentVMG = polars[currentConfig].maxVMG;
  const targetVMG = polars[targetConfig].maxVMG;

  return targetVMG - currentVMG;
}

/**
 * Get optimal sailing angle for current conditions
 * @param windSpeedKnots - Wind speed in knots
 * @param sailConfig - Sail configuration name
 * @returns Optimal True Wind Angle in degrees
 */
export function getOptimalTWA(
  windSpeedKnots: number,
  sailConfig: string
): number | null {
  const category = getWindConditionCategory(windSpeedKnots);
  const polar = SAIL_POLARS[category][sailConfig];
  
  return polar ? polar.optimalTWA : null;
}

/**
 * Get maximum possible VMG for current conditions
 * @param windSpeedKnots - Wind speed in knots
 * @param sailConfig - Sail configuration name
 * @returns Maximum VMG in knots
 */
export function getMaxVMG(
  windSpeedKnots: number,
  sailConfig: string
): number | null {
  const category = getWindConditionCategory(windSpeedKnots);
  const polar = SAIL_POLARS[category][sailConfig];
  
  return polar ? polar.maxVMG : null;
}
