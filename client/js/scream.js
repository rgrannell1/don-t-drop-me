
import constants from './constants.js'


const scream = {}

const state = {}

const audio = new Audio(constants.urls.scream)

/**
 * Play the scream audio, without playing it too often or while
 * the scream is already playing.
 *
 */
scream.play = () => {
  if (state.playing) {
    return
  }

  state.playing = true
  audio.play()

  setTimeout(() => {
    state.playing = false
  }, 5000)
}

export default scream
