import { Operation } from './operation'

export class Subtraction extends Operation {
  description() {
    return `${this.minuend} - ${this.subtrahend}`
  }

  // minuend - subtrahend = difference
  init() {
    this.subtrahend = this.randomNumber(100)
    this.difference = this.randomNumber(100)
    this.minuend = this.subtrahend + this.difference
  }

  answer() {
    return this.difference
  }
}
