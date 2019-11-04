
const GRAVITY = 9.81

const constants = {
  GRAVITY,
  thresholds: {
    maxAcceleration: GRAVITY * 4,
    freefallLower: 0.8 * GRAVITY,
    freefallUpper: 1.2 * GRAVITY
  }
}

const setMode = state => {
  $main = document.querySelector('main')
  $main.setAttribute('data-mode', state)
}

const calculateMagnitude = acceleration => {
  return Math.sqrt(Math.pow(acceleration.x, 2), Math.pow(acceleration.y, 2), Math.pow(acceleration.z, 2))
}

const isInFreefall = (magnitude, state) => {
  return magnitude > constants.thresholds.freefallLower && magnitude < constants.thresholds.freefallUpper
}

const onSupport = state => {
  let maxAcceleration = 0
  window.addEventListener('devicemotion', event => {
    const magnitude = calculateMagnitude(event.acceleration)

    if (magnitude > maxAcceleration && magnitude < constants.thresholds.maxAcceleration) {
      maxAcceleration = magnitude
    }

    if (isInFreefall(magnitude, state)) {
      setMode('freefall')
    } else {
      setMode('normal')
    }

    document.querySelector('main').textContent = `${Math.round(magnitude * 100) / 100} ${maxAcceleration}`

//      document.querySelector('main').textContent = calculateMagnitude(event.acceleration)
  }, true)

  setMode('normal')
}

const onNoSupport = () => {
  alert('not supported.')
}

const state = {

}

if (window.DeviceMotionEvent) {
  onSupport(state)
} else {
  onNoSupport()
}
