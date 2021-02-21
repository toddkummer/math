import { Controller } from 'stimulus-repo/packages/stimulus'
import { OperationConfig } from '../operation_config'
import configuration from '../../data/operations.yml'
import { MenuBuilder } from '../menu_bulder'

export class NavigationBarController extends Controller {
  static targets = [
    'burger',
    'menu',
    'practiceTab',
    'testTab',
    'operationTab',
    'tabs',
    'itemTemplate',
    'dropdownTemplate',
  ]

  static values = { operation: String }
  static siblings = ['practice', 'quiz']

  static operationsConfig = OperationConfig.operationsConfigFromData(
    configuration.operations
  )

  connect() {
    this.generateTabs()
    this.toggleTabs()
  }

  operationConfig() {
    return this.constructor.operationsConfig.get(this.operationValue)
  }

  generateTabs() {
    if (!this.tabsGenerated) {
      const { navigation } = configuration
      new MenuBuilder(
        this.tabsTarget,
        this.itemTemplateTarget.content,
        this.dropdownTemplateTarget.content
      ).build(navigation)
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
    this.inactivateDropdown(event.target)
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

  inactivateDropdown(item) {
    const dropdown = item.closest('div.navbar-item.has-dropdown')
    if (dropdown) {
      dropdown.classList.toggle('is-hoverable')
      setTimeout(
        (dropdown) => {
          dropdown.classList.toggle('is-hoverable')
        },
        100,
        dropdown
      )
    }
  }
}
