import { Application } from 'stimulus-repo/packages/stimulus'
import { MathController } from './math_controller.js'
import { EquationController } from './equation_controller'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faAppleAlt, faPencilRuler } from '@fortawesome/free-solid-svg-icons'

require('../styles.scss')

const application = Application.start()
application.register('math', MathController)
application.register('equation', EquationController)

library.add(faAppleAlt, faPencilRuler)
dom.watch()
