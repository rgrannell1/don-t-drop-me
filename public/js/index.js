
import constants from './constants.js'
import motion from './motion.js'
import pages from './pages.js'

const onAcceleration = {}

/**
 * Update the application state when the device is in freefall.
 *
 * @name onAcceleration.freefall
 *
 * @param {object} state the application state
 */
onAcceleration.freefall = state => {
  state.freefallEvents += 1

  if (state.freefallEvents >= constants.thresholds.freefallEvents) {

    new Audio('data/wilhelm.mp3').play()

    pages.index({
      mode: constants.modes.freefall,
      face: constants.faces.freefall,
      message: constants.messages.freefall.default
    })
  }
}

/**
 * Render the application while in its default state.
 *
 * @name onAcceleration.default
 *
 */
onAcceleration.default = () => {
  state.freefallEvents = 0

  pages.index({
    mode: constants.modes.normal,
    face: constants.faces.normal,
    message: constants.messages.normal.default
  })
}

/**
 * Monitor the device's acceleration and render the application
 * accordingly.
 *
 * @param {object} state the application state
 */
const detectFall = state => {
  window.addEventListener('devicemotion', event => {
    if (motion.isInFreefall(motion.magnitude(event.acceleration), state)) {
      onAcceleration.freefall(state)
    } else {
      onAcceleration.default()
    }
  }, true)

  pages.index({
    mode: constants.modes.normal,
    face: constants.faces.normal,
    message: constants.messages.normal.default
  })
}

/**
 * Render the application when the devicemotion api's are unsupported
 *
 */
const onNoSupport = () => {
  pages.index({
    mode: constants.modes.invalid,
    face: constants.face.unsupported,
    message: constants.messages.unsupported.default
  })
}

/**
 * @constant
 * @type {object}
 *
 * The application state.
*/
const state = {
  recentMagnitudes: []
}

/**
 * Register the application's service-worker
 */
const registerServiceWorker = async () => {
  try {
    const reg = await navigator.serviceWorker.register('../service-worker.js')
    console.log(`registered service-worker: scope is ${reg.scope}`)
  } catch (err) {
    console.error(`failed to register service-worker: ${err.message}`)
  }
}

/**
 * Run the application
 */
async function main() {
  await registerServiceWorker()

  if (window.DeviceMotionEvent) {
    detectFall(state)
  } else {
    onNoSupport()
  }
}

main()
