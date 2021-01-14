import { Operation } from './operation'

export class Division extends Operation {
  description() {
    return `${this.dividend} / ${this.divisor}`
  }

  // dividend / divisor = quotient
  init() {
    this.divisor = this.randomNumber(this.settings.factorRange)
    this.quotient = this.randomNumber(this.settings.factorRange)
    this.dividend = this.divisor * this.quotient
  }

  answer() {
    return this.quotient
  }
}
