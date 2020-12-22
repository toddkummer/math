/* global Stimulus */
import { MathController } from './math.js'
const application = Stimulus.Application.start()
application.register('math', MathController)
