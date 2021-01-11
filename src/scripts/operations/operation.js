export class Operation {
  randomNumber(range) {
    range = range || 10
    return Math.floor(Math.random() * range) + 1
  }

  answer() {
    return null
  }

  correctAnswer(answer) {
    return this.answer() === parseInt(answer)
  }
}
