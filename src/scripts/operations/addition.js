import { Operation } from './operation'

export class Addition extends Operation {
  description() {
    return `${this.a} + ${this.b}`
  }

  init() {
    this.a = this.randomNumber(this.settings.addendRange)
    this.b = this.randomNumber(this.settings.addendRange)
  }

  answer() {
    return this.a + this.b
  }
}
