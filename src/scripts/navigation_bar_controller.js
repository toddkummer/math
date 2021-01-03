import { Controller } from 'stimulus-repo/packages/stimulus'

export class NavigationBarController extends Controller {
  static targets = ['burger', 'menu']

  toggle(event) {
    this.burgerTarget.classList.toggle('is-active')
    this.menuTarget.classList.toggle('is-active')
  }
}
