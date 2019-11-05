
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

constants.thresholds = {
  freefallLower: 0.8 * constants.GRAVITY,
  freefallUpper: 1.2 * constants.GRAVITY,
  freefallEvents: calculateEvents()
}

const view = {}

view.setText = (selector, content) => {
  $elem = document.querySelector(selector)
  $elem.textContent = content
}

const calculateEvents = () => {
  const {interval} = deviceMotionEvent

  return interval < 30 ? 3 : 1
}

const setMode = (state, viewData = {}) => {
  if (!constants.modes.hasOwnProperty(state)) {
    throw new Error(`${state} is not a valid state for the page.`)
  }

  if (viewData.face) {
    view.setText('#face-text', viewData.face)
  }

  if (viewData.message) {
    view.setText('#subtitle-text', viewData.message)
  }

  $main = document.querySelector('main')
  $main.setAttribute('data-mode', state)
}

const magnitude = acc => {
  const ax = Math.pow(acc.x, 2)
  const ay = Math.pow(acc.y, 2)
  const az = Math.pow(acc.z, 2)

  return Math.sqrt(ax + ay + az)
}

const isInFreefall = (magnitude, state) => {
  const {
    freefallLower,
    freefallUpper
  } = constants.thresholds
  return magnitude > freefallLower && magnitude < freefallUpper
}

const onAcceleration = {}

onAcceleration.freefall = state => {
  state.freefallEvents += 1

  if (state.freefallEvents > constants.thresholds.freefallEvents) {
    setMode(constants.modes.freefall, {
      face: constants.faces.freefall,
      message: constants.messages.freefall.default
    })
  }
}

onAcceleration.default = () => {
  state.freefallEvents = 0

  setMode(constants.modes.normal, {
    face: constants.faces.normal,
    message: constants.messages.normal.default
  })
}

const detectFall = state => {
  window.addEventListener('devicemotion', event => {
    const acc = event.acceleration

    if (isInFreefall(magnitude(acc), state)) {
      onAcceleration.freefall(state)
    } else {
      onAcceleration.default()
    }
  }, true)

  setMode('normal', {
    face: constants.faces.normal,
    message: constants.messages.normal.default
  })
}

const onNoSupport = () => {
  setMode('invalid', {
    face: constants.face.unsupported,
    message: constants.messages.unsupported.default
  })
}

const state = {
  freefallEvents: 0
}

async function registerServiceWorker() {
  try {
    const reg = await navigator.serviceWorker.register('./service-worker.js')
    console.log(`registered service-worker: scope is ${reg.scope}`)
  } catch (err) {
    console.error(`failed to register service-worker: ${err.message}`)
  }
}

async function main() {
  await registerServiceWorker()

  if (window.DeviceMotionEvent) {
    detectFall(state)
  } else {
    onNoSupport()
  }
}

main()
