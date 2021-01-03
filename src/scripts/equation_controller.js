import { Controller } from 'stimulus-repo/packages/stimulus'
import { Multiplication } from './multiplication'
export class EquationController extends Controller {
  static targets = ['problem', 'answer']
  static parent = 'quiz'

  initialize() {
    this.operation = new Multiplication()
  }

  switchOperation(OperationClass) {
    this.operation = new OperationClass()
  }

  generateProblem() {
    this.operation.init()
    this.problemTarget.textContent = this.operation.description()
  }

  connect() {
    this.generateProblem()
  }

  correct() {
    const element = this.answerTarget
    const answer = parseInt(element.value)
    return answer === this.operation.answer()
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
