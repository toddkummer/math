import { Controller } from 'stimulus-repo/packages/stimulus'

export class MathController extends Controller {
  static targets = ['practiceTab', 'testTab']

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
}
