import * as express from 'express'

async function handleAddressRoute(req, res) {
    console.log('address route reached')
    res.send({
        address1: '13 Oxford Street',
        name: 'xyz solicitors Ltd',
        postcode: 'SE1 ABC',
        town: 'London',
    })
}

export const router = express.Router({mergeParams: true})

router.get('/address', handleAddressRoute)

export default router
