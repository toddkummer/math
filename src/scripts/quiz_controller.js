import { Controller } from 'stimulus-repo/packages/stimulus'

export class QuizController extends Controller {
  static targets = ['questions', 'submit', 'results', 'restart']
  static parent = 'math'
  static children = ['equation']

  show() {
    this.element.classList.remove('is-hidden')
  }

  hide() {
    this.element.classList.add('is-hidden')
  }

  switchToMultiplication() {
    this.equationChildren.forEach((equation) => {
      equation.switchToMultiplication()
    })
    this.restart()
  }

  switchToDivision() {
    this.equationChildren.forEach((equation) => {
      equation.switchToDivision()
    })
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
      for (let counter = 1; counter < 20; counter++) {
        const clone = this.equationChild.element.cloneNode(true)
        this.questionsTarget.appendChild(clone)
      }
      this.questionsGenerated = true
    }
  }
}
