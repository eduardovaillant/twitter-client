import { HttpPost } from '@/infra/protocols/http-client/http-post'
import axios from 'axios'

export class AxiosAdapter implements HttpPost {
  async post (url: string, data: any): Promise<any> {
    return await axios.post(url, data)
  }
}
