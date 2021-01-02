export class Division {
  description() {
    return `${this.dividend} / ${this.divisor}`
  }

  // dividend / divisor = quotient
  init() {
    this.divisor = this.randomNumber()
    this.quotient = this.randomNumber()
    this.dividend = this.divisor * this.quotient
  }

  randomNumber() {
    return Math.floor(Math.random() * 10) + 1
  }

  answer() {
    return this.quotient
  }
}
