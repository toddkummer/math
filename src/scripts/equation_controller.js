import { Controller } from 'stimulus-repo/packages/stimulus'
import { Multiplication } from './multiplication'
import { Division } from './division'
export class EquationController extends Controller {
  static targets = ['problem', 'answer']
  static parent = 'quiz'

  initialize() {
    this.multiplication = new Multiplication()
    this.division = new Division()
    this.switchToMultiplication()
  }

  switchToMultiplication() {
    this.function = this.multiplication
  }

  switchToDivision() {
    this.function = this.division
  }

  generateProblem() {
    this.function.init()
    console.log('generate problem called' + this.function.description())
    this.problemTarget.textContent = this.function.description()
  }

  connect() {
    this.generateProblem()
  }

  correct() {
    const element = this.answerTarget
    const answer = parseInt(element.value)
    return answer === this.function.answer()
  }

  wrong() {
    this.problemTarget.classList.replace('is-static', 'is-danger')
    this.answerTarget.classList.add('is-danger')
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
    this.answerTarget.classList.remove('is-danger')
    this.answerTarget.value = ''
    this.removeReadOnly()
    this.generateProblem()
  }
}
