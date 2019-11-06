
const constants = {
  GRAVITY: 9.81,
  modes: {
    unsupported: 'unsupported',
    normal: 'normal',
    freefall: 'freefall',
  },
  faces: {
    normal: '(◕‿◕✿)',
    freefall: 'ಠ╭╮ಠ'
  },
  messages: {
    normal: {
      default: 'Hi!'
    },
    unsupported: {
      default: 'Sorry, your browser isn\'t supported'
    },
    freefall: {
      default: 'AAAAAAH!'
    }
  }
}

/**
 * Calculate the number of subsequent fall events needed to trigger a
 * state change.
 *
 * @returns {number} the number of intervals
 */
const requiredSubsequentEvents = () => {
  const { interval } = DeviceMotionEvent

  return interval < 30 ? 2 : 1
}

constants.thresholds = {
  freefallLower: 0.8 * constants.GRAVITY,
  freefallUpper: 1.2 * constants.GRAVITY,
  freefallEvents: requiredSubsequentEvents()
}

export default constants
