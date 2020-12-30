import { Controller } from 'stimulus-repo/packages/stimulus'

export class PracticeController extends Controller {
  static parent = 'math'
  static targets = ['answer', 'equation', 'result']

  connect() {
    this.a = this.randomNumber()
    this.b = this.randomNumber()
    this.equationTarget.textContent = `${this.a} * ${this.b}`
    this.answerTarget.focus()
  }

  randomNumber() {
    return Math.floor(Math.random() * 10) + 1
  }

  show() {
    this.element.classList.remove('is-hidden')
    this.answerTarget.focus()
  }

  hide() {
    this.element.classList.add('is-hidden')
  }

  submitOnEnter(event) {
    if (event.key === 'Enter') {
      this.submit()
    }
  }

  submit() {
    const element = this.answerTarget
    const answer = parseInt(element.value)
    this.resultTarget.classList.remove('is-hidden')
    this.answerTarget.value = ''
    if (answer === this.a * this.b) {
      this.correctAnswer()
    } else {
      this.wrongAnswer(answer)
    }
  }

  correctAnswer() {
    console.log(`Your answer is correct`)
    this.resultTarget.textContent = 'Correct Answer!'
    this.resultTarget.classList.replace('is-danger', 'is-success')
    setTimeout(() => {
      this.resultTarget.classList.add('is-hidden')
      this.connect()
    }, 1000)
  }

  wrongAnswer(answer) {
    console.log(`Your answer is incorrect`)
    this.resultTarget.textContent = `The correct answer is ${
      this.a * this.b
    }.     Your answer was ${answer}. `
    this.resultTarget.classList.replace('is-success', 'is-danger')
  }
}
