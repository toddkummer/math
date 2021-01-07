import { Controller } from 'stimulus-repo/packages/stimulus'
import { OperationConfig } from './operation_config'
import operations from '../data/operations.yml'

export class MathController extends Controller {
  static targets = ['practiceTab', 'testTab', 'operationTab']

  static values = { operation: String }
  static children = ['practice', 'quiz']

  static operationsConfig = OperationConfig.operationsConfigFromData(operations)

  connect() {
    this.toggleTabs()
  }

  operationConfig() {
    return this.constructor.operationsConfig.get(this.operationValue)
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
    this.practiceChild.switchOperation(this.operationConfig())
    this.quizChild.switchOperation(this.operationConfig())
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
