import { BASE_URI } from "../index"

export class EmailCustomerAccountService {
  getEmailCustomerAccount() {
    return fetch(`${BASE_URI}/email-account`).then(r => r.json())
  }
}
