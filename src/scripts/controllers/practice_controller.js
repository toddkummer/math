import { Controller } from 'stimulus-repo/packages/stimulus'

export class PracticeController extends Controller {
  static siblings = ['navigationBar']
  static targets = ['answer', 'equation', 'result']

  afterNavigationBarSiblingRegistration() {
    this.switchOperation(this.navigationBarSibling.operationConfig())
  }

  switchOperation(operationConfig) {
    this.operation = operationConfig.newOperation()
    this.generateProblem()
  }

  generateProblem() {
    this.operation.init()
    this.equationTarget.textContent = this.operation.description()
    this.answerTarget.focus()
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
    const answer = this.answerTarget.value
    this.resultTarget.classList.remove('is-hidden')
    this.answerTarget.value = ''
    if (this.operation.correctAnswer(answer)) {
      this.correctAnswer()
    } else {
      this.wrongAnswer(answer)
    }
  }

  correctAnswer() {
    this.resultTarget.textContent = 'Correct Answer!'
    this.resultTarget.classList.replace('is-danger', 'is-success')
    setTimeout(() => {
      this.resultTarget.classList.add('is-hidden')
      this.generateProblem()
    }, 1000)
  }

  wrongAnswer(answer) {
    this.resultTarget.textContent = `The correct answer is ${this.operation.formattedAnswer()}. Your answer was ${answer}. `
    this.resultTarget.classList.replace('is-success', 'is-danger')
  }
}
