
import constants from './constants.js'

const motion = {}

motion.magnitude = acc => {
  const ax = Math.pow(acc.x, 2)
  const ay = Math.pow(acc.y, 2)
  const az = Math.pow(acc.z, 2)

  return Math.sqrt(ax + ay + az)
}

motion.isInFreefall = (magnitude, state) => {
  const {
    freefallLower,
    freefallUpper
  } = constants.thresholds
  return magnitude > freefallLower && magnitude < freefallUpper
}

export default motion
