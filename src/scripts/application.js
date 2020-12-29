/* global Stimulus */
import { MathController, EquationController } from './math.js'

require('../styles.scss')

const application = Stimulus.Application.start()
application.register('math', MathController)
application.register('equation', EquationController)
