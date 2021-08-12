import { createPack, getStickerPack, postSticker, testGet } from "../js/sticker-funcs"
import axios from "axios"

jest.mock('axios');

describe('sticker-funcs', () => {
  test('should call getStickerPack and return mock data', async () => {
    const name = 'somePath'
    const mockData = {
      data: 'test'
    }
    axios.get.mockResolvedValue(mockData)

    const response = await getStickerPack(name)

    expect(response).toBe(mockData.data)
  })

  test('should call getStickerPack and throw an error', async () => {
    const name = 'somePath'
    const err = {
      message: 'Why did you break it?'
    }
    let spy = jest.spyOn(console, 'error')

    axios.get.mockRejectedValue(err)

    await getStickerPack(name)

    expect(spy).toHaveBeenCalledWith(err)
  })

  test('should call createPack and return a successful axios.post request', async () => {
    const name = 'someName'
    const title = 'someTitle'
    const emojis = 'smiley'
    const response = {
      status: 202,
      statusText: 'Ok'
    }

    axios.post.mockResolvedValue(response)
    let spy = jest.spyOn(document, 'getElementById')

    let mockElement = document.createElement('image')
    mockElement.files = ['aCatPng']

    spy.mockReturnValue(mockElement)

    const request = await createPack(name, title, emojis)

    expect(request).toBe(response)
  })

  test('should call createPack and throw an error', async () => {
    const name = 'somePath'
    const err = {
      message: 'Why did you break it?'
    }
    let spy = jest.spyOn(console, 'error')

    axios.post.mockRejectedValue(err)

    await createPack(name)

    expect(spy).toHaveBeenCalledWith(err)
  })

  test('should call postSticker and return a successful axios.post request', async () => {
    const name = 'someName'
    const emojis = 'smiley'
    const response = {
      status: 202,
      statusText: 'Ok'
    }

    axios.post.mockResolvedValue(response)
    let spy = jest.spyOn(document, 'getElementById')

    let mockElement = document.createElement('image')
    mockElement.files = ['aCatPng']

    spy.mockReturnValue(mockElement)

    const request = await postSticker(name, emojis)

    expect(request).toBe(response)
  })

  test('should call postSticker and throw an error', async () => {
    const name = 'somePath'
    const err = {
      message: 'Why did you break it?'
    }
    let spy = jest.spyOn(console, 'error')

    axios.post.mockRejectedValue(err)

    await postSticker(name)

    expect(spy).toHaveBeenCalledWith(err)
  })

  test('should call testGet and return a successful axio.get request', async () => {
    const name = 'somePath'
    const mockData = {
      data: 'test'
    }
    axios.get.mockResolvedValue(mockData)

    const response = await testGet(name)

    expect(response).toBe(mockData.data)
  })

  test('should call testGet and throw an error', async () => {
    const err = {
      message: 'Why did you break it?'
    }
    let spy = jest.spyOn(console, 'error')

    axios.get.mockRejectedValue(err)

    await testGet()

    expect(spy).toHaveBeenCalledWith(err)
  })
})
