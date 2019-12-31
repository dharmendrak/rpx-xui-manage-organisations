import * as log4jui from '../lib/log4jui'
import * as express from 'express'
import { getConfigValue } from '../configuration'
import { SERVICES_RD_PROFESSIONAL_API_PATH } from '../configuration/references'
import { http } from '../lib/http'

const logger = log4jui.getLogger('service-token')

async function handleUserListRoute(req, res) {
    const orgId = req.session.auth.orgId
    //for testing hardcode your org id
    //const orgId = 'B13GT1M'
    try {
        const url = `${getConfigValue(SERVICES_RD_PROFESSIONAL_API_PATH)}/refdata/external/v1/organisations/users`
        const response = await http.get(url)
        logger.info('response::', response.data)
        res.send(response.data)
    } catch (error) {
        const errReport = {
            apiError: error.data && error.data.message ? error.data.message : error,
            apiStatusCode: error.statusCode,
            message: 'List of users route error',
        }
        res.status(500).send(errReport)
    }
}

export const router = express.Router({ mergeParams: true })

router.get('/', handleUserListRoute)

export default router
