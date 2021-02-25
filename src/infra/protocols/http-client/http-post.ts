export interface HttpPost {
  post: (url: string, data: any) => Promise<any>
}
