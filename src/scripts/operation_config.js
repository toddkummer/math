import { Division } from './operations/division'
import { Multiplication } from './operations/multiplication'
import { Addition } from './operations/addition'
import { Subtraction } from './operations/subtraction'
import { RemainderDivision } from './operations/remainder_division'

export class OperationConfig {
  static operationsConfigFromData(operations) {
    return Object.entries(operations).reduce((map, [key, value]) => {
      return map.set(key, new OperationConfig(operations[key]))
    }, new Map())
  }

  static classes = {
    Multiplication,
    Division,
    RemainderDivision,
    Addition,
    Subtraction,
  }

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
    return new OperationConfig.classes[this.className](this.config.parameters)
  }
}
