export class MenuBuilder {
  constructor(menuElement, itemContent, dropdownContent) {
    this.menuElement = menuElement
    this.itemContent = itemContent
    this.dropdownContent = dropdownContent
  }

  build(navigation) {
    navigation.forEach((entry) => {
      const tab = this.navigationItem(entry)
      this.menuElement.appendChild(tab)
    })
  }

  navigationItem(entry) {
    if (entry.type === 'item') {
      return this.generateItem(entry.name, entry.operation)
    } else if (entry.type === 'dropdown') {
      return this.generateDropdown(entry.name, entry.items)
    } else {
      throw new Error(`Do not know how to display navigation for ${entry}`)
    }
  }

  generateItem(name, operation) {
    const item = this.itemContent.cloneNode(true)
    item.firstElementChild.textContent = name
    item.firstElementChild.dataset.operation = operation
    return item
  }

  generateDropdown(name, items) {
    const dropdown = this.dropdownContent.cloneNode(true)
    dropdown.querySelector('a.navbar-link').textContent = name

    const itemsParent = dropdown.querySelector('div.navbar-dropdown')
    items.forEach((item) => {
      itemsParent.appendChild(this.generateItem(item.name, item.operation))
    })
    return dropdown
  }
}
