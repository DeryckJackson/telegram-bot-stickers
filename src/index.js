import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import $ from 'jquery'
import { postSticker, createPack } from './js/sticker-funcs'
import { showSpinner, hideSpinner, previewImage } from './js/helper-funcs'
import { EmojiButton } from '@joeattardi/emoji-button'
import "regenerator-runtime/runtime"

// Needed for Hot Module Replacement
if (typeof (module.hot) !== 'undefined') {
  module.hot.accept() // eslint-disable-line no-undef
}

$(document).ready(() => {
  $('.spinner-border').hide()
  const outputImage = $('#output-image')
  outputImage.hide()

  const picker = new EmojiButton({
    position: 'bottom-start'
  })
  const trigger = document.querySelector('#trigger')

  $('#image').change((e) => {
    previewImage(e)
    outputImage.show()
  })

  $('#addStickerForm').on('submit', async (e) => {
    e.preventDefault()
    showSpinner('#addStickerButton')

    try {
      await postSticker($('#stickerName').val(), $('#emoji').val())
      document.getElementById('image').value = null
      outputImage.hide()
      hideSpinner('#addStickerButton')
    } catch (err) {
      hideSpinner('#addStickerButton')
      console.error(err)
      alert('Something went wrong, Idda know what. *shrug*')
    }
  })

  $('#createPackForm').on('submit', async (e) => {
    e.preventDefault()
    showSpinner('#createPackButton')

    try {
      await createPack($('#stickerName').val(), $('#stickerTitle').val(), $('#emoji').val())
      document.getElementById('image').value = null
      outputImage.hide()
      hideSpinner('#createPackButton')
    } catch (err) {
      hideSpinner('#createPackButton')
      console.error(err)
      alert('Something went wrong, Idda know what. *shrug*')
    }
  })

  // Shows the emoji picker
  $(trigger).on('click', () => {
    picker.togglePicker(trigger)
  })

  // Adds picked emoji to the emoji text field
  picker.on('emoji', selection => {
    $('#emoji').val((i, val) => {
      return val + selection.emoji
    })
  })
});
