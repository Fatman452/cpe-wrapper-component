import { BASE_URI } from "."

export class MockMyLibraryService {
  getImages() {
    return fetch(`${BASE_URI}/library/images`).then(r => r.json())
  }

  getFolders() {
    return fetch(`${BASE_URI}/library/folders`).then(r => r.json())
  }

  getSummary() {
    return fetch(`${BASE_URI}/library/summary`).then(r => r.json())
  }

  generateImageFolders() {
    return fetch(`${BASE_URI}/library/folders`, { method: "POST" }).then(r => r.json())
  }
}
