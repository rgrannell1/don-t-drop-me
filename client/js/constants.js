
/**
 * @constant
 * @type {object}
 *
 * Constants used by the application.
*/
const constants = {
  GRAVITY: 9.81,
  modes: {
    unsupported: 'unsupported',
    normal: 'normal',
    freefall: 'freefall',
  },
  urls: {
    scream: 'https://raw.githubusercontent.com/rgrannell1/don-t-drop-me/master/public/data/wilhelm.mp3'
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

  const threshold = 60

  const requiredEvents = Math.floor(threshold / interval)
  requiredEvents


  return interval < 30 ? 4 : 6
}

constants.thresholds = {
  freefallLower: 0.8 * constants.GRAVITY,
  freefallUpper: 1.2 * constants.GRAVITY,
  freefallEvents: requiredSubsequentEvents(),
  sampleTime: 60
}

export default constants
