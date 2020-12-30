import { Controller } from 'stimulus-repo/packages/stimulus'

export class EquationController extends Controller {
  static targets = ['problem', 'answer']
  static parent = 'math'

  randomNumber() {
    return Math.floor(Math.random() * 10) + 1
  }

  generateProblem() {
    this.a = this.randomNumber()
    this.b = this.randomNumber()
    this.problemTarget.textContent = `${this.a} * ${this.b}`
  }

  connect() {
    this.generateProblem()
  }

  correct() {
    const element = this.answerTarget
    const answer = parseInt(element.value)
    return answer === this.a * this.b
  }

  wrong() {
    this.problemTarget.classList.replace('is-static', 'is-danger')
    this.makeReadOnly()
  }

  right() {
    this.problemTarget.classList.replace('is-static', 'is-success')
    this.makeReadOnly()
  }

  makeReadOnly() {
    this.answerTarget.setAttribute('readonly', true)
  }

  removeReadOnly() {
    this.answerTarget.removeAttribute('readonly')
  }

  reset() {
    this.problemTarget.classList.remove('is-danger', 'is-success')
    this.problemTarget.classList.add('is-static')
    this.answerTarget.value = ''
    this.removeReadOnly()
    this.generateProblem()
  }
}
