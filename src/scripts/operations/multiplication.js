import { Operation } from './operation'

export class Multiplication extends Operation {
  description() {
    return `${this.a} * ${this.b}`
  }

  init() {
    this.a = this.randomNumber(this.settings.factorRange)
    this.b = this.randomNumber(this.settings.factorRange)
  }

  answer() {
    return this.a * this.b
  }
}
