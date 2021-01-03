import { Controller } from 'stimulus-repo/packages/stimulus'

export class MathController extends Controller {
  static targets = ['practiceTab', 'testTab', 'operationTab']

  static values = { operation: String }
  static children = ['practice', 'quiz']

  connect() {
    this.toggleTabs()
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
    if (this.operationValue === 'multiplication') {
      this.switchToMultiplication()
    } else {
      this.switchToDivision()
    }
    this.toggleTabs()
  }

  switchToMultiplication() {
    this.practiceChild.switchToMultiplication()
    this.quizChild.switchToMultiplication()
  }

  switchToDivision() {
    this.practiceChild.switchToDivision()
    this.quizChild.switchToDivision()
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
