/* global Stimulus */
class EquationController extends Stimulus.Controller {
  static get targets() {
    return ['problem', 'answer']
  }

  randomNumber() {
    return Math.floor(Math.random() * 10) + 1
  }

  generateProblem() {
    this.a = this.randomNumber()
    this.b = this.randomNumber()
    this.problemTarget.textContent = `${this.a} * ${this.b}`
  }

  connect() {
    this.generateProblem()
  }

  correct() {
    const element = this.answerTarget
    const answer = parseInt(element.value)
    return answer === this.a * this.b
  }

  wrong() {
    this.problemTarget.classList.replace('is-static', 'is-danger')
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
    this.answerTarget.value = ''
    this.removeReadOnly()
    this.generateProblem()
  }
}
class MathController extends Stimulus.Controller {
  static get targets() {
    return [
      'answer',
      'equation',
      'result',
      'practiceTab',
      'testTab',
      'practice',
      'test',
      'testList',
      'testSubmit',
      'testEquation',
      'testResults',
      'testRestart',
    ]
  }

  connect() {
    this.a = this.randomNumber()
    this.b = this.randomNumber()
    this.equationTarget.textContent = `${this.a} * ${this.b}`
    this.answerTarget.focus()
  }

  randomNumber() {
    return Math.floor(Math.random() * 10) + 1
  }

  submitOnEnter(event) {
    if (event.key === 'Enter') {
      this.submit()
    }
  }

  submit() {
    const element = this.answerTarget
    const answer = parseInt(element.value)
    this.resultTarget.classList.remove('is-hidden')
    this.answerTarget.value = ''
    if (answer === this.a * this.b) {
      this.correctAnswer()
    } else {
      console.log(`Your answer is incorrect`)
      this.resultTarget.textContent = `The correct answer is ${
        this.a * this.b
      }.     Your answer was ${answer}. `
      this.resultTarget.classList.replace('is-success', 'is-danger')
    }
  }

  correctAnswer() {
    console.log(`Your answer is correct`)
    this.resultTarget.textContent = 'Correct Answer!'
    this.resultTarget.classList.replace('is-danger', 'is-success')
    setTimeout(() => {
      this.resultTarget.classList.add('is-hidden')
      this.connect()
    }, 1000)
  }

  startTest() {
    console.log('The test has started')
    this.practiceTabTarget.classList.remove('is-active')
    this.testTabTarget.classList.add('is-active')
    this.practiceTarget.classList.add('is-hidden')
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
    this.practiceTarget.classList.remove('is-hidden')
    this.testTarget.classList.add('is-hidden')
  }

  get testEquationControllers() {
    return this.testEquationTargets.map((element) => {
      return this.application.getControllerForElementAndIdentifier(
        element,
        'equation'
      )
    })
  }

  finishTest() {
    console.log('Test has finished')
    let correct = 0
    this.testEquationControllers.forEach((equation) => {
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
    this.testEquationControllers.forEach((equation) => equation.reset())
    this.testSubmitTarget.classList.replace('is-static', 'is-primary')
    this.testResultsTarget.classList.add('is-hidden')
    this.testRestartTarget.classList.add('is-hidden')
  }
}
export { MathController, EquationController }
