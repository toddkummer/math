/* global Stimulus */

function camelize(value) {
  return value.replace(/(?:[_-])([a-z0-9])/g, (_, char) => char.toUpperCase())
}

function childConnectHandler(event) {
  if (event.detail.parent === this.identifier) {
    const controller = event.detail.controller
    const propertyName = `${camelize(controller.identifier)}Children`
    this[propertyName].push(controller)
    controller.parent = this
  }
}

// controllers specify children with a static method named children that returns an array of names (in kebab case)
function specifiesChildren(controller) {
  return controller.constructor.children !== undefined
}

// controllers specify a parent with a static method named parent that returns the parent name (in kebab case)
function specifiesParent(controller) {
  return controller.constructor.parent !== undefined
}

export class ApplicationController extends Stimulus.Controller {
  connect() {
    // if the controller specifies children, add array for children and listener for child connect event
    if (specifiesChildren(this)) {
      console.log(this.identifier + ' specifies children')
      this.constructor.children.forEach((name) => this.setupChildren(name))
      this.element.addEventListener('connect', childConnectHandler.bind(this))
    }

    // if the controller specifies a parent, then dispatch a connect event
    if (specifiesParent(this)) {
      console.log(this.identifier + ' specifies a parent')
      const info = { controller: this, parent: this.constructor.parent }
      this.element.dispatchEvent(
        new CustomEvent('connect', { bubbles: true, detail: info })
      )
    }
  }

  disconnect() {
    if (specifiesChildren(this)) {
      this.element.removeEventListener('connect', childConnectHandler)
    }

    if (specifiesParent(this)) {
      this.parent = null
    }
  }

  setupChildren(name) {
    const propertyName = `${name}Children`
    this[propertyName] = []
    this[`${name}Child`] = () => this[propertyName][0]
  }
}
