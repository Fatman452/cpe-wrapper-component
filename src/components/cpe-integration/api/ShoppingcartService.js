import { BASE_URI } from "."

export class ShoppingcartService {
  saveProduct(payload) {
    return fetch(`${BASE_URI}/cart/product`, { method: "POST", body: { ...payload } }).then(r =>
      r.json(),
    )
  }
}
