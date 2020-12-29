/* global Stimulus */
import { MathController, EquationController } from './math.js'
// import { library, dom } from '@fortawesome/fontawesome-svg-core'
// import { faEquals } from '@fortawesome/free-solid-svg-icons'

require('../styles.scss')

const application = Stimulus.Application.start()
application.register('math', MathController)
application.register('equation', EquationController)

// library.add(faEquals)
// dom.watch()
