
import { render } from 'https://unpkg.com/lit-html?module';

import constants from './constants.js'
import motion from './motion.js'
import pages from './pages.js'

const onAcceleration = {}

onAcceleration.freefall = state => {
  state.freefallEvents += 1

  if (state.freefallEvents >= constants.thresholds.freefallEvents) {
    pages.index({
      mode: constants.modes.freefall,
      face: constants.faces.freefall,
      message: constants.messages.freefall.default
    })
  }
}

onAcceleration.default = () => {
  state.freefallEvents = 0

  pages.index({
    mode: constants.modes.normal,
    face: constants.faces.normal,
    message: constants.messages.normal.default
  })
}

const detectFall = state => {
  window.addEventListener('devicemotion', event => {
    const acc = event.acceleration

    if (motion.isInFreefall(motion.magnitude(acc), state)) {
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

const onNoSupport = () => {
  pages.index({
    mode: constants.modes.invalid,
    face: constants.face.unsupported,
    message: constants.messages.unsupported.default
  })
}

const state = {
  freefallEvents: 0
}

async function registerServiceWorker() {
  try {
    const reg = await navigator.serviceWorker.register('../service-worker.js')
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
