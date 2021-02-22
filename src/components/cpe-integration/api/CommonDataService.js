import { BASE_URI } from "../index"

export class CommonDataService {
  getStateData() {
    return fetch(`${BASE_URI}/common/states`).then(r => r.json())
  }
}
