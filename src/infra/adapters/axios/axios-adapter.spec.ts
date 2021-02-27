import { AxiosAdapter } from './axios-adapter'
import axios from 'axios'

jest.mock('axios', () => ({
  async post (): Promise<any> {
    return Promise.resolve(null)
  }
}))

describe('HttpAdapter', () => {
  describe('HttpPost', () => {
    test('should call post with correct values', async () => {
      const sut = new AxiosAdapter()
      const postSpy = jest.spyOn(axios, 'post')
      await sut.post('any_url', 'any_data')
      expect(postSpy).toHaveBeenCalledWith('any_url', 'any_data')
    })
  })
})
