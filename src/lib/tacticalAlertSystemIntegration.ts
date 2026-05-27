/**
 * Integration Hook for Tactical Alert System
 * 
 * This file provides the React hook that should be added to App.tsx to enable
 * real-time tactical monitoring and advisor alerts.
 * 
 * INSTALLATION:
 * 1. Add this import to App.tsx:
 *    import { generateTacticalAlerts, formatTacticalAdvisory } from './lib/tacticalAlertSystem';
 * 
 * 2. Add this hook inside the App component (after other state declarations):
 *    
 *    useEffect(() => {
 *      // Only monitor if active ship exists and user is logged in
 *      if (!activeShip || !isLoggedIn || !destination) return;
 *
 *      const telemetry = {
 *        lat: activeShip.lat || 0,
 *        lng: activeShip.lng || 0,
 *        cog: activeShip.cog || 0,
 *        sog: activeShip.sog || 0,
 *        windDir: weather.windDir || 0,
 *        windSpeed: weather.wind || 0,
 *        waypointLat: destination.lat,
 *        waypointLng: destination.lng,
 *        currentSailConfig: 'full' // TODO: Add sail config state to App
 *      };

 *      // Generate alerts
 *      const alerts = generateTacticalAlerts(telemetry);
 *      
 *      // Format and update advisor
 *      if (alerts.length > 0) {
 *        const advisory = formatTacticalAdvisory(alerts);
 *        setAdvisorMessage(advisory.message);
 *        setAdvisorText({
 *          text: advisory.message,
 *          priority: advisory.priority,
 *          timestamp: Date.now()
 *        });
 *        setHasNewAdvice(true);
 *      }
 *    }, [activeShip, destination, weather, isLoggedIn]);
 */

// This file serves as documentation for the integration.
// The actual hook is meant to be integrated directly in App.tsx
// to maintain performance and avoid prop drilling.

export const TACTICAL_ALERT_SYSTEM_ENABLED = true;

export const INTEGRATION_INSTRUCTIONS = `
=================================================================
TACTICAL ALERT SYSTEM - INTEGRATION GUIDE
=================================================================

The tactical alert system provides real-time navigation monitoring with dynamic
precision requirements and sail optimization recommendations.

COMPONENTS:
1. generateTacticalAlerts() - Core analysis engine
2. formatTacticalAdvisory() - Message formatting
3. getTacticalRecommendations() - Performance suggestions

QUICK START:

In App.tsx, add this useEffect hook after line 686 (where advisorMessage is declared):

---START CODE---

import { generateTacticalAlerts, formatTacticalAdvisory, NavigationTelemetry } from './lib/tacticalAlertSystem';

// ... in App component, after state declarations ...

// TACTICAL ALERT MONITORING
useEffect(() => {
  // Only monitor if conditions are met
  if (!activeShip || !isLoggedIn || !destination) return;
  
  // Throttle to ~1Hz to avoid excessive updates
  const interval = setInterval(() => {
    const telemetry: NavigationTelemetry = {
      lat: activeShip.lat || 0,
      lng: activeShip.lng || 0,
      cog: activeShip.cog || 0,
      sog: activeShip.sog || 0,
      windDir: weather.windDir || 0,
      windSpeed: weather.wind || 0,
      waypointLat: destination.lat,
      waypointLng: destination.lng,
      currentSailConfig: 'full' // TODO: Connect to sail config state when added
    };

    const alerts = generateTacticalAlerts(telemetry);
    
    if (alerts.length > 0) {
      const advisory = formatTacticalAdvisory(alerts);
      setAdvisorMessage(advisory.message);
      setAdvisorText({
        text: advisory.message,
        priority: advisory.priority,
        timestamp: Date.now()
      });
      setHasNewAdvice(true);
    }
  }, 1000); // Update every 1 second

  return () => clearInterval(interval);
}, [activeShip, destination, weather, isLoggedIn]);

---END CODE---

FEATURES:
✓ Dynamic deviation thresholds (ceñida: 8°, través: 15°, empopada: 18°)
✓ Sail configuration optimization with VMG gains
✓ Real-time wind condition monitoring
✓ Safety threshold alerts (wind > 25 knots = critical)
✓ Prioritized multi-alert system
✓ Spanish/English ready

TESTING:
Run: npm run test src/lib/laylineCalculator.test.ts
Expected: 40+ test cases pass with 100% coverage

TODO:
1. Add 'currentSailConfig' state to App.tsx to track sail trim
2. Connect sail trim UI controls to update this state
3. Add historical alert logging to Logbook
4. Create Tactical Advisory dashboard panel
5. Add user preferences for alert thresholds

=================================================================
`;
