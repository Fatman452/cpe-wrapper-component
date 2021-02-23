import { BASE_URI } from "."

export class AccountService {
  async getAccount() {
    return await fetch(`${BASE_URI}/accounts`).then(r => r.json())
  }
}
