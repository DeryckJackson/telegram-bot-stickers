import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import $ from 'jquery'
import { postSticker, createPack } from './js/sticker-funcs'
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
    showSpinner()

    try {
      await postSticker($('#stickerName').val(), $('#emoji').val())
      document.getElementById('image').value = null
      outputImage.hide()
      hideSpinner()
    } catch (err) {
      hideSpinner()
      console.error(err)
      alert('Something went wrong, Idda know what. *shrug*')
    }
  })

  $('#createPackForm').on('submit', async (e) => {
    e.preventDefault()
    showSpinner()

    try {
      await createPack($('#stickerName').val(), $('#stickerTitle').val(), $('#emoji').val())
      document.getElementById('image').value = null
      outputImage.hide()
      hideSpinner()
    } catch (err) {
      hideSpinner()
      console.error(err)
      alert('Something went wrong, Idda know what. *shrug*')
    }
  })

  $(trigger).on('click', () => {
    picker.togglePicker(trigger)
  })

  picker.on('emoji', selection => {
    $('#emoji').val((i, val) => {
      return val + selection.emoji
    })
  })
});

function showSpinner() {
  const button = $('#createPackButton')
  const spinner = $('.spinner-border')

  button.addClass('disabled')
  spinner.show()
}

function hideSpinner() {
  const button = $('#createPackButton')
  const spinner = $('.spinner-border')

  button.removeClass('disabled')
  spinner.hide()
}

function previewImage(event) {
  const reader = new FileReader()
  reader.onload = () => {
    const output = document.getElementById('output-image')
    output.src = reader.result
  };
  reader.readAsDataURL(event.target.files[0])
}
