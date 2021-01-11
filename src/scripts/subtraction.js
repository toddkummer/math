export class Subtraction {
  description() {
    return `${this.minuend} - ${this.subtrahend}`
  }

  // minuend - subtrahend = difference
  init() {
    this.subtrahend = this.randomNumber()
    this.difference = this.randomNumber()
    this.minuend = this.subtrahend + this.difference
  }

  randomNumber() {
    return Math.floor(Math.random() * 100) + 1
  }

  answer() {
    return this.difference
  }
}
