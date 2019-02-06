import * as express from 'express'
import organisationRouter from './organisation'
import stateRouter from './states'

const router = express.Router({ mergeParams: true })

router.use('/decisions', stateRouter)

/**
 * TODO: /organisation is broad for a route, but a route is required initially just to check that the UI app is
 * able to hit and retrieve data from the Node layer.
 */
router.use('/organisation', organisationRouter)

export default router
