class MathController extends Stimulus.Controller {
  static get targets() {
    return ['answer', 'equation', 'result']
  }

  connect() {
    this.a = this.randomNumber()
    this.b = this.randomNumber()
    this.equationTarget.textContent = `${this.a} * ${this.b}`
  }

  randomNumber() {
    return Math.floor(Math.random() * 10) + 1
  }

  submit() {
    const element = this.answerTarget
    const answer = parseInt(element.value)
    this.resultTarget.classList.remove('is-hidden')
    if (answer === this.a * this.b) {
      console.log(`Your answer is correct`)
      this.resultTarget.textContent = 'Correct Answer!'
      this.resultTarget.classList.replace('is-danger', 'is-success')
    } else {
      console.log(`Your answer is incorrect`)
      this.resultTarget.textContent = `The correct answer is: ${
        this.a * this.b
      }`
      this.resultTarget.classList.replace('is-success', 'is-danger')
    }
  }
}
export { MathController }
