import { Division } from './division'
import { Multiplication } from './multiplication'

export class OperationConfig {
  static operationsConfigFromData(operations) {
    return Object.entries(operations).reduce((map, [key, value]) => {
      return map.set(key, new OperationConfig(operations[key]))
    }, new Map())
  }

  static classes = { Multiplication, Division }

  constructor(config) {
    this.config = config
  }

  get className() {
    return this.config.className
  }

  get tabName() {
    return this.config.tabName || this.className
  }

  newOperation() {
    return new OperationConfig.classes[this.className]()
  }
}
