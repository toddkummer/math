export class Operation {
  constructor(settings) {
    this.settings = settings
  }

  randomNumber(range) {
    range = range || 10
    return Math.floor(Math.random() * range) + 1
  }

  answer() {
    return null
  }

  formattedAnswer() {
    return new Intl.NumberFormat().format(this.answer())
  }

  correctAnswer(answer) {
    return (
      this.formattedAnswer() === answer || this.answer() === parseInt(answer)
    )
  }
}
