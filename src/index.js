import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import $ from 'jquery'
import axios from 'axios'
import { EmojiButton } from '@joeattardi/emoji-button'
import "regenerator-runtime/runtime"

// Needed for Hot Module Replacement
if (typeof (module.hot) !== 'undefined') {
  module.hot.accept() // eslint-disable-line no-undef  
}

axios.defaults.baseURL = 'https://stickers-api.deryck.dev'

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
    const button = $('#addStickerButton')
    const spinner = $('.spinner-border')

    button.addClass('disabled')
    spinner.show()

    try {
      await postSticker($('#stickerName').val(), $('#emoji').val())
      document.getElementById('image').value = null
      outputImage.hide()
      button.removeClass('disabled')
      spinner.hide()
    } catch (err) {
      button.removeClass('disabled')
      spinner.hide()
      console.error(err)
      alert('Something went wrong, Idda know what. *shrug*')
    }
  })

  $('#createPackForm').on('submit', async (e) => {
    e.preventDefault()
    const button = $('#createPackButton')
    const spinner = $('.spinner-border')

    button.addClass('disabled')
    spinner.show()

    try {
      await createPack($('#stickerName').val(), $('#stickerTitle').val(), $('#emoji').val())
      document.getElementById('image').value = null
      outputImage.hide()
      button.removeClass('disabled')
      spinner.hide()
    } catch (err) {
      button.removeClass('disabled')
      spinner.hide()
      console.error(err)
      alert('Something went wrong, Idda know what. *shrug*')
    }
  })

  $('#test').on('click', () => {
    testGet()
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

async function getStickerPack(name) {
  try {
    const response = await axios.get(`/stickers/${name}`)
    console.log(response)
  } catch (err) {
    console.error(err)
  }
}

async function createPack(name, title, emojis) {
  const photo = document.getElementById('image').files[0];
  const formData = new FormData()

  formData.append('photo', photo)
  formData.append('title', title)
  formData.append('name', name)
  formData.append('emojis', emojis)

  try {
    await axios.post('/pack', formData)
  } catch (err) {
    console.error(err)
  }
}

async function postSticker(name, emojis) {
  const photo = document.getElementById('image').files[0];
  const formData = new FormData()

  formData.append('photo', photo)
  formData.append('name', name)
  formData.append('emojis', emojis)

  try {
    await axios.post('/stickers', formData)
  } catch (err) {
    console.error(err)
  }
}

async function testGet() {
  try {
    const response = await axios.get('/')
    console.log(response)
  } catch (err) {
    console.error(err)
  }
}

function previewImage(event) {
  const reader = new FileReader()
  reader.onload = () => {
    const output = document.getElementById('output-image')
    output.src = reader.result
  };
  reader.readAsDataURL(event.target.files[0])
}
