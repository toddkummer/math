import { Operation } from './operation'

export class Addition extends Operation {
  description() {
    return `${this.a} + ${this.b}`
  }

  init() {
    this.a = this.randomNumber(100)
    this.b = this.randomNumber(100)
  }

  answer() {
    return this.a + this.b
  }
}
