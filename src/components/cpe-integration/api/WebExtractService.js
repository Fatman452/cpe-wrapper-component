import { BASE_URI } from "../index"

export class WebExtractService {
  getWebContent() {
    return fetch(`${BASE_URI}/web-extract/content`).then(r => r.json())
  }

  getValidProviders() {
    return fetch(`${BASE_URI}/web-extract/valid-providers`).then(r => r.json())
  }
}
