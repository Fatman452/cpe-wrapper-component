import { BASE_URI } from "../index"

export class ContactsService {
  getContactDetails() {
    return fetch(`${BASE_URI}/contact/1/details`).then(r => r.json())
  }
  getContactLists() {
    return fetch(`${BASE_URI}/contacts`).then(r => r.json())
  }
  createContactList(name) {
    return fetch(`${BASE_URI}/contact`, { method: "POST", body: { name } }).then(r => r.json())
  }
}
