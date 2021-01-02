import { Controller } from 'stimulus-repo/packages/stimulus'

export class MathController extends Controller {
  static targets = [
    'practiceTab',
    'testTab',
    'multiplicationTab',
    'divisionTab',
  ]

  static children = ['practice', 'quiz']

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

  switchToMultiplication() {
    console.log('Switching to Multiplication')
    this.practiceChild.switchToMultiplication()
    this.quizChild.switchToMultiplication()
    this.toggleTabs()
  }

  switchToDivision() {
    console.log('Switching to Division')
    this.practiceChild.switchToDivision()
    this.quizChild.switchToDivision()
    this.toggleTabs()
  }

  toggleTabs() {
    this.multiplicationTabTarget.classList.toggle('is-active')
    this.divisionTabTarget.classList.toggle('is-active')
  }
}
