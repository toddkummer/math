import { Operation } from './operation'

export class Division extends Operation {
  description() {
    return `${this.dividend} / ${this.divisor}`
  }

  // dividend / divisor = quotient
  init() {
    this.divisor = this.randomNumber(this.settings.divisorRange)
    this.quotient = this.randomNumber(
      this.settings.quotientRange || this.settings.divisorRange
    )
    this.dividend = this.divisor * this.quotient
  }

  answer() {
    return this.quotient
  }
}
