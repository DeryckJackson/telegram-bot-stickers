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

axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:3000'

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

    const data = await postSticker($('#stickerName').val(), $('#emoji').val())

    if (data.result === true) {
      document.getElementById('image').value = null
      outputImage.hide()
      button.removeClass('disabled')
      spinner.hide()
    } else {
      alert('Something went wrong, Idda know what. *shrug*')
      button.removeClass('disabled')
      spinner.hide()
    }
  })

  $('#createPackForm').on('submit', async (e) => {
    e.preventDefault()
    const button = $('#createPackButton')
    const spinner = $('.spinner-border')

    button.addClass('disabled')
    spinner.show()

    const data = await createPack($('#stickerName').val(), $('#stickerTitle').val(), $('#emoji').val())

    if (data.result === true) {
      document.getElementById('image').value = null
      outputImage.hide()
      button.removeClass('disabled')
      spinner.hide()
    } else {
      alert('Something went wrong, Idda know what. *shrug*')
      button.removeClass('disabled')
      spinner.hide()
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
    console.log(response.data)
  } catch (err) {
    console.log(err)
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
    const response = await axios.post('/pack', formData)
    return new Promise(resolve => {
      resolve(response.data)
    })
  } catch (err) {
    console.log(err)
  }
}

async function postSticker(name, emojis) {
  const photo = document.getElementById('image').files[0];
  const formData = new FormData()

  formData.append('photo', photo)
  formData.append('name', name)
  formData.append('emojis', emojis)

  try {
    const response = await axios.post('/stickers', formData)
    return new Promise(resolve => {
      resolve(response.data)
    })
  } catch (err) {
    console.log(err)
  }
}

async function testGet() {
  try {
    const response = await axios.get('/')
    console.log(response.data)
  } catch (err) {
    console.log(err)
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
