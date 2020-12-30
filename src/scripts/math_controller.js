import { Controller } from 'stimulus-repo/packages/stimulus'

export class MathController extends Controller {
  static targets = [
    'practiceTab',
    'testTab',
    'test',
    'testList',
    'testSubmit',
    'testEquation',
    'testResults',
    'testRestart',
  ]

  static children = ['practice', 'equation']

  startTest() {
    console.log('The test has started')
    this.practiceTabTarget.classList.remove('is-active')
    this.practiceChild.hide()
    this.testTabTarget.classList.add('is-active')
    this.testTarget.classList.remove('is-hidden')
    if (!this.equationsGenerated) {
      for (let counter = 1; counter < 20; counter++) {
        const clone = this.testEquationTarget.cloneNode(true)
        this.testListTarget.appendChild(clone)
      }
      this.equationsGenerated = true
    }
  }

  startPractice() {
    console.log('Practice has started')
    this.testTabTarget.classList.remove('is-active')
    this.practiceTabTarget.classList.add('is-active')
    this.practiceChild.show()
    this.testTarget.classList.add('is-hidden')
  }

  finishTest() {
    console.log('Test has finished')
    let correct = 0
    this.equationChildren.forEach((equation) => {
      if (equation.correct()) {
        console.log('equation is correct')
        equation.right()
        correct++
      } else {
        console.log('equation is incorrect')
        equation.wrong()
      }
    })
    this.testSubmitTarget.classList.replace('is-primary', 'is-static')
    this.testResultsTarget.classList.remove('is-hidden')
    const total = this.testEquationTargets.length
    this.testResultsTarget.textContent = `You got ${correct} out of ${total} correct!`
    this.testRestartTarget.classList.remove('is-hidden')
  }

  restartTest() {
    this.equationChildren.forEach((equation) => equation.reset())
    this.testSubmitTarget.classList.replace('is-static', 'is-primary')
    this.testResultsTarget.classList.add('is-hidden')
    this.testRestartTarget.classList.add('is-hidden')
  }
}
