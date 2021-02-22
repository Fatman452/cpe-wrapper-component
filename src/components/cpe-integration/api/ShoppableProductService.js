import { BASE_URI } from "../index"

export class ShoppableProductService {
  getProducts() {
    return fetch(`${BASE_URI}/shoppable-products`).then(r => r.json())
  }
}
