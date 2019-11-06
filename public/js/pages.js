
import { html, render } from 'https://unpkg.com/lit-html?module';

const pages = {}

/**
 * Render the application page
 *
 * @name pages.index
 *
 * @param {object} data
 * @param {DomElement} elem
 */
pages.index = (data, elem) => {
  const template = html`
    <main data-mode="${data.mode}">
      <p id="face-text">${data.face}</p>
      <p id="subtitle-text">${data.message}</p>
    </main>
  `

  render(template, elem ? elem : document.body)
}

export default pages
