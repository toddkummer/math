import { Controller } from 'stimulus-repo/packages/stimulus'
import { OperationConfig } from '../operation_config'
import operations from '../../data/operations.yml'

export class NavigationBarController extends Controller {
  static targets = [
    'burger',
    'menu',
    'practiceTab',
    'testTab',
    'operationTab',
    'tabs',
    'tabTemplate',
  ]

  static values = { operation: String }
  static siblings = ['practice', 'quiz']

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
      const tabs = this.tabsTarget

      this.constructor.operationsConfig.forEach((operation, key) => {
        const clone = template.cloneNode(true)
        clone.firstElementChild.textContent = operation.tabName
        clone.firstElementChild.dataset.operation = key
        tabs.appendChild(clone)
      })

      this.tabsGenerated = true
    }
  }

  startTest() {
    this.practiceTabTarget.classList.remove('is-active')
    this.practiceSibling.hide()
    this.testTabTarget.classList.add('is-active')
    this.quizSibling.generateQuestions()
    this.quizSibling.show()
  }

  startPractice() {
    this.testTabTarget.classList.remove('is-active')
    this.practiceTabTarget.classList.add('is-active')
    this.practiceSibling.show()
    this.quizSibling.hide()
  }

  switchOperation(event) {
    this.operationValue = event.target.dataset.operation
    this.practiceSibling.switchOperation(this.operationConfig())
    this.quizSibling.switchOperation(this.operationConfig())
    this.toggleTabs()
  }

  toggle(event) {
    this.burgerTarget.classList.toggle('is-active')
    this.menuTarget.classList.toggle('is-active')
  }

  // private
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
