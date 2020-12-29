import { Application } from 'stimulus'
import { MathController, EquationController } from './math.js'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faAppleAlt, faPencilRuler } from '@fortawesome/free-solid-svg-icons'

require('../styles.scss')

const application = Application.start()
application.register('math', MathController)
application.register('equation', EquationController)

library.add(faAppleAlt, faPencilRuler)
dom.watch()
