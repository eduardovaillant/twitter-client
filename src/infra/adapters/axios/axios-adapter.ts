import { HttpPost } from '@/infra/protocols/http-client/http-post'
import axios from 'axios'

export class AxiosAdapter implements HttpPost {
  async post (url: string, data: any): Promise<any> {
    const response = await axios.post(url, data)
    return response
  }
}
