import { Operation } from './operation'

export class RemainderDivision extends Operation {
  description() {
    return `${this.dividend} / ${this.divisor}`
  }

  // dividend / divisor = quotient
  init() {
    this.divisor = this.randomNumber(this.settings.factorRange)
    this.quotient = this.randomNumber(this.settings.factorRange)
    this.remainder = this.randomNumber(this.divisor) - 1
    this.dividend = this.divisor * this.quotient + this.remainder
  }

  answer() {
    return `${this.quotient} r ${this.remainder}`
  }

  formattedAnswer() {
    return this.answer()
  }

  correctAnswer(answer) {
    const [answerQuotient, answerRemainder] = answer
      .split('r')
      .map((int) => parseInt(int))
    return (
      this.quotient === answerQuotient &&
      this.remainder === (answerRemainder || 0)
    )
  }
}
