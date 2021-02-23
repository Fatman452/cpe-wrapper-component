import { BASE_URI } from "."

export class EmailCustomerAccountService {
  getEmailCustomerAccount() {
    return fetch(`${BASE_URI}/email-account`).then(r => r.json())
  }
}
