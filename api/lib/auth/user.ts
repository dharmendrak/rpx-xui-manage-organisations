import axios, { AxiosPromise, AxiosResponse } from 'axios'
import * as express from 'express'
import * as log4js from 'log4js'
import { config } from '../config'
import { profileMap } from '../config/refProfile'
import { roleMap } from '../config/refRoles'
import { http } from '../lib'
import { EnhancedRequest } from '../lib/models'
import { asyncReturnOrError } from '../lib/util'

const logger = log4js.getLogger('auth')
logger.level = config.logging

export async function getUserDetails(jwt: string): Promise<AxiosResponse> {
    const options = {
        headers: { Authorization: `Bearer ${jwt}` },
    }

    return await http.get(`${config.services.idam.idamApiUrl}/details`, options)
}

export async function get(req: EnhancedRequest, res: express.Response) {
    const details: any = await asyncReturnOrError(getUserDetails(req.auth.token), 'Failed to get user details', res, logger)
    res.setHeader('Content-Type', 'application/json')
    details.data.roles = [...details.data.roles, 'PUI_CASE_MANAGER']
    res.send(JSON.stringify(details.data))
}

export async function profile(req: EnhancedRequest, res: express.Response) {
    const details: any = await asyncReturnOrError(getUserDetails(req.auth.token), 'Failed to get user details', res, logger)

    res.setHeader('Content-Type', 'application/json')
    details.data.roles = [...details.data.roles, 'PUI_CASE_MANAGER']
    let fields = []
    const roles = []

    Object.keys(profileMap).forEach(key => {
        const field = {
            label: profileMap[key],
            value: details.data[key],
        }

        fields.push(field)
    })

    details.data.roles.forEach(role => {
        if (roleMap[role]) {
            roles.push(roleMap[role])
        } else {
            logger.warn(`Role ${role} not found in role translation`)
        }
    })

    fields = [
        ...fields,
        {
            label: 'Permissions',
            value: roles,
        },
    ]
    return res.send(fields)
}
