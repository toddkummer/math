import { Controller } from 'stimulus-repo/packages/stimulus'
import { OperationConfig } from './operation_config'
import operations from '../data/operations.yml'

export class MathController extends Controller {
  static targets = [
    'practiceTab',
    'testTab',
    'operationTab',
    'tabs',
    'tabTemplate',
  ]

  static values = { operation: String }
  static children = ['practice', 'quiz']

  static operationsConfig = OperationConfig.operationsConfigFromData(operations)

  connect() {
    this.generateTabs()
    this.toggleTabs()
  }

  operationConfig() {
    return this.constructor.operationsConfig.get(this.operationValue)
  }

  generateTabs() {
    if (!this.tabsGenerated) {
      const template = this.tabTemplateTarget.content
      console.log(template)
      const tabs = this.tabsTarget
      this.constructor.operationsConfig.forEach((operation) => {
        const clone = template.cloneNode(true)
        const tab = tabs.appendChild(clone)
        console.log(tab)
        tab.firstElementChild.textContent = 'gobears'
        console.log(clone)
        // clone.dataset.operation = operation.className
      })

      this.tabsGenerated = true
    }
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
