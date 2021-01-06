import { Controller } from 'stimulus-repo/packages/stimulus'

export class QuizController extends Controller {
  static targets = [
    'questionTemplate',
    'column',
    'submit',
    'results',
    'restart',
  ]

  static parent = 'math'
  static children = ['equation']

  show() {
    this.element.classList.remove('is-hidden')
  }

  hide() {
    this.element.classList.add('is-hidden')
  }

  afterParentRegistration() {
    this.switchOperation(this.operationClass())
  }

  operationClass() {
    return this.parent.operationClass()
  }

  switchOperation(OperationClass) {
    this.equationChildren.forEach((equation) =>
      equation.switchOperation(OperationClass)
    )
    this.restart()
  }

  submit() {
    console.log('Test has finished')
    let correct = 0
    this.equationChildren.forEach((equation) => {
      if (equation.correct()) {
        equation.right()
        correct++
      } else {
        equation.wrong()
      }
    })
    this.submitTarget.classList.replace('is-primary', 'is-static')
    this.restartTarget.classList.remove('is-hidden')
    this.displayResults(correct)
  }

  displayResults(correct) {
    const total = this.equationChildren.length
    this.resultsTarget.classList.remove('is-hidden')
    this.resultsTarget.textContent = `You got ${correct} out of ${total} correct!`
  }

  restart() {
    this.equationChildren.forEach((equation) => equation.reset())
    this.submitTarget.classList.replace('is-static', 'is-primary')
    this.resultsTarget.classList.add('is-hidden')
    this.restartTarget.classList.add('is-hidden')
  }

  generateQuestions() {
    if (!this.questionsGenerated) {
      const template = this.questionTemplateTarget.content
      const columns = this.columnTargets
      const questionsPerColumn = 20 / columns.length

      columns.forEach((column) => {
        for (let counter = 1; counter <= questionsPerColumn; counter++) {
          const clone = template.cloneNode(true)
          column.appendChild(clone)
        }
      })

      this.questionsGenerated = true
    }
  }
}
