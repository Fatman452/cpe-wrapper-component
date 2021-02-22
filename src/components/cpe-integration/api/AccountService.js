import { BASE_URI } from "../index"

export class AccountService {
  async getAccount() {
    return await fetch(`${BASE_URI}/accounts`).then(r => r.json())
  }
}
