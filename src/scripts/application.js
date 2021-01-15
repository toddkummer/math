import { Application } from 'stimulus-repo/packages/stimulus'
import { MathController } from './controllers/math_controller.js'
import { PracticeController } from './controllers/practice_controller'
import { QuizController } from './controllers/quiz_controller'
import { EquationController } from './controllers/equation_controller'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faAppleAlt, faPencilRuler } from '@fortawesome/free-solid-svg-icons'
import { NavigationBarController } from './controllers/navigation_bar_controller'

require('../styles.scss')

const application = Application.start()
application.register('math', MathController)
application.register('practice', PracticeController)
application.register('quiz', QuizController)
application.register('equation', EquationController)
application.register('navigation-bar', NavigationBarController)

library.add(faAppleAlt, faPencilRuler)
dom.watch()
