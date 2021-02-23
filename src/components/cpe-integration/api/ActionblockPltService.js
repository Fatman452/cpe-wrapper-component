import { BASE_URI } from "."

export class ActionblockPltService {
  getProductData() {
    return fetch(`${BASE_URI}/action-block/products`).then(r => r.json())
  }
  getLandingPages() {
    return fetch(`${BASE_URI}/action-block/landing-pages`).then(r => r.json())
  }
  insertProduct(payload) {
    return fetch(`${BASE_URI}/action-block/product`, {
      method: "POST",
      body: { ...payload },
    }).then(r => r.json())
  }
  createAbSurvey(payload) {
    return fetch(`${BASE_URI}/action-block/abSurvey`, {
      method: "POST",
      body: { ...payload },
    }).then(r => r.json())
  }
  createAbRsvp(payload) {
    return fetch(`${BASE_URI}/action-block/abRsvp`, {
      method: "POST",
      body: { ...payload },
    }).then(r => r.json())
  }
  createAbPoll(payload) {
    return fetch(`${BASE_URI}/action-block/abPoll`, {
      method: "POST",
      body: { ...payload },
    }).then(r => r.json())
  }
}
