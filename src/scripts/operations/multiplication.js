import { Operation } from './operation'

export class Multiplication extends Operation {
  description() {
    return `${this.a} * ${this.b}`
  }

  init() {
    this.a = this.randomNumber()
    this.b = this.randomNumber()
  }

  answer() {
    return this.a * this.b
  }
}
