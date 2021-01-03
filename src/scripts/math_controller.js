import { Controller } from 'stimulus-repo/packages/stimulus'
import { Multiplication } from './multiplication'
import { Division } from './division'

export class MathController extends Controller {
  static targets = ['practiceTab', 'testTab', 'operationTab']

  static values = { operation: String }
  static children = ['practice', 'quiz']

  static operations = { multiplication: Multiplication, division: Division }

  connect() {
    this.toggleTabs()
  }

  operationClass() {
    return this.constructor.operations[this.operationValue]
  }

  startTest() {
    this.practiceTabTarget.classList.remove('is-active')
    this.practiceChild.hide()
    this.testTabTarget.classList.add('is-active')
    this.quizChild.generateQuestions()
    this.quizChild.show()
  }

  startPractice() {
    this.testTabTarget.classList.remove('is-active')
    this.practiceTabTarget.classList.add('is-active')
    this.practiceChild.show()
    this.quizChild.hide()
  }

  switchOperation(event) {
    this.operationValue = event.target.dataset.operation
    this.practiceChild.switchOperation(this.operationClass())
    this.quizChild.switchOperation(this.operationClass())
    this.toggleTabs()
  }

  toggleTabs() {
    this.operationTabTargets.forEach((tab) => {
      if (this.operationValue === tab.dataset.operation) {
        tab.classList.add('is-active')
      } else {
        tab.classList.remove('is-active')
      }
    })
  }
}
