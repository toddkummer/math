import { Controller } from 'stimulus-repo/packages/stimulus'

export class EquationController extends Controller {
  static targets = ['problem', 'answer']
  static parent = 'quiz'

  afterParentRegistration() {
    this.switchOperation(this.parent.operationConfig())
  }

  switchOperation(operationConfig) {
    this.operation = operationConfig.newOperation()
    this.generateProblem()
  }

  generateProblem() {
    this.operation.init()
    this.problemTarget.textContent = this.operation.description()
  }

  correct() {
    return this.operation.correctAnswer(this.answerTarget.value)
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
