import { BASE_URI } from "../index"

export class VimeoService {
  async fetchVideosById(videoId) {
    return await fetch(`${BASE_URI}/videos/vimeo/${videoId}`).then(r => r.json())
  }
}
