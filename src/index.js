import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import $ from 'jquery'
import axios from 'axios'
import { EmojiButton } from '@joeattardi/emoji-button'

axios.defaults.baseURL = 'http://localhost:3000';

$(document).ready(() => {
  const picker = new EmojiButton({
    position: 'bottom-start'
  })
  const trigger = document.querySelector('#trigger')

  $('#image').change((event) => {
    previewImage(event)
  })

  $('#submit').click(() => {
    postSticker($('#stickerName').val(), $('#emoji').val())
  })

  $('#test').click(() => {
    testGet()
  })

  $(trigger).click(() => {
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

async function postSticker(packName, emojis) {
  const photo = document.getElementById('image').files[0];
  const formData = new FormData()

  formData.append('photo', photo)
  formData.append('name', packName)
  formData.append('emojis', emojis)

  try {
    axios.post('/', formData)
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
