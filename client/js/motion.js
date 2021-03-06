
import constants from './constants.js'

const motion = {}


/**
 * Calculate the number of subsequent fall events needed to trigger a
 * state change.
 *
 * @returns {number} the number of intervals
 */
motion.requiredFreefallEvents = () => {
  const { interval } = DeviceMotionEvent

  const requiredEvents = Math.floor(100 / interval)

  return isNaN(requiredEvents)
    ? 2
    : Math.max(2, requiredEvents)
}

/**
 * Calculate the magnitude of the device's acceleration, given the
 * directional accelerations of the device.
 *
 * @name motion.magnitude
 *
 * @param {Object} acc an object containing acceleration data for each axis.
 *
 * @returns {number} the magnitude of the acceleration
 */
motion.magnitude = acc => {
  const ax = Math.pow(acc.x, 2)
  const ay = Math.pow(acc.y, 2)
  const az = Math.pow(acc.z, 2)

  return Math.sqrt(ax + ay + az)
}

/**
 * Detect whether the device is in freefall given the current acceleration
 * magnitude and the application's state
 *
 * @name motion.isInFreefall
 *
 * @param {number} magnitude the magnitude of the device's acceleration
 * @param {object} state the application state
 *
 * @returns {boolean} is the device in freefall at the moment?
 */
motion.isInFreefall = (magnitude, state) => {
  const {
    freefallLower,
    freefallUpper
  } = constants.thresholds

  const isFreefall = magnitude > freefallLower && magnitude < freefallUpper

  state.recentMagnitudes.push({
    isFreefall,
    magnitude
  })

  // -- maintain the buffer length.
  if (state.recentMagnitudes.length >= motion.requiredFreefallEvents()) {
    state.recentMagnitudes = state.recentMagnitudes.slice(1)
  }

  return state.recentMagnitudes.every(data => data.isFreefall)
}

export default motion
