export class Multiplication {
  description() {
    return `${this.a} * ${this.b}`
  }

  init() {
    this.a = this.randomNumber()
    this.b = this.randomNumber()
  }

  randomNumber() {
    return Math.floor(Math.random() * 10) + 1
  }

  answer() {
    return this.a * this.b
  }
}
