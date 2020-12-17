class Equation {
  constructor (a, b) {
    this.a = a
    this.b = b
  }

  get display () {
    return `${this.a} ${this.constructor.operator} ${this.b} = ${this.answer}`
  }
}

class Addition extends Equation {
    static operator = '+'
    get answer () { return this.a + this.b }
}

class Subtraction extends Equation {
    static operator = '-'
    get answer () { return this.a - this.b }
}

class Multiplication extends Equation {
    static operator = '*'
    get answer () { return this.a * this.b }
}

class Division extends Equation {
    static operator = '+'
    get answer () { return this.a / this.b }
}

class RemainderDivision extends Equation {
  get answer () { return Math.floor(this.a / this.b) }
  get remainder () { return this.a % this.b }
  get display () {
    return `${this.a} ${this.constructor.operator} ${this.b} = ${this.answer}`
  }
}

export { Addition, Subtraction, Multiplication, Division, RemainderDivision }
