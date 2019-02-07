import * as express from 'express'
import * as auth from '../lib/auth'
import * as user from '../lib/auth/user'

// async function handleAddressRoute(req, res) {
//     console.log('address route reached')
//     res.send({
//         address1: '13 Oxford Street',
//         name: 'xyz solicitors Ltd',
//         postcode: 'SE1 ABC',
//         town: 'London',
//     })
// }

export const router = express.Router({mergeParams: true})

router.get('/callback', auth.oauth)
router.get('/logout', auth.logout)

/**
 * TODO: Think about whether to move these out.
 */
app.get('/user/profile', user.profile)
app.get('/user', user.get)

export default router
