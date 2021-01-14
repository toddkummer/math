import { Operation } from './operation'

export class Subtraction extends Operation {
  description() {
    return `${this.minuend} - ${this.subtrahend}`
  }

  // minuend - subtrahend = difference
  init() {
    this.subtrahend = this.randomNumber(this.settings.subtrahendRange)
    this.difference = this.randomNumber(this.settings.differenceRange)
    this.minuend = this.subtrahend + this.difference
  }

  answer() {
    return this.difference
  }
}
