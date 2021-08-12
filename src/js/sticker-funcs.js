import axios from 'axios'

axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:3000'

async function getStickerPack(name) {
  try {
    const response = await axios.get(`/stickers/${name}`)
    return response.data
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
    return await axios.post('/pack', formData)
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
    return await axios.post('/stickers', formData)
  } catch (err) {
    console.error(err)
  }
}

async function testGet() {
  try {
    const response = await axios.get('/')
    console.log(response.data)
  } catch (err) {
    console.error(err)
  }
}

export { getStickerPack, createPack, postSticker, testGet }
