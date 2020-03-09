import * as propertiesVolume from '@hmcts/properties-volume'
import * as config from 'config'
import { propsExist } from '../lib/objectUtilities'
import {DEVELOPMENT, HTTP} from './constants'
import { PROTOCOL} from './references'

/**
 * If you are running locally you might need to set the mountPoint up as documented in the readme.
 * ie. propertiesVolume.addTo(config, { mountPoint: '/Volumes/mnt/secrets/'})
 *
 * ALLOW_CONFIG_MUTATIONS should equal true on the environment otherwise HMCTS Properties Volume will
 * not be able to merge the volume secrets into the Node config object.
 *
 * @see Readme.md
 * @see https://github.com/lorenwest/node-config/wiki/Environment-Variables
 */
export const initialiseSecrets = () => {
  propertiesVolume.addTo(config)
  // propertiesVolume.addTo(config, { mountPoint: '/Volumes/mnt/secrets/'})
}

/**
 * Get Environment
 *
 * See Readme for more information on how the configuration file is set.
 * 'Environmental Variables Setup & Error Handling'
 *
 * @see Readme
 * @returns {string} ie. - development / preview / aat / ithc, prod
 */
export const getEnvironment = () => process.env.NODE_CONFIG_ENV

/**
 * Get Configuration Value
 *
 * Returns the configuration value, using a config reference. It uses the reference to pull out the value
 * from the .yaml file
 *
 * @see /config .yaml
 * @see references.ts
 * @param reference - ie. 'services.ccdDefApi'
 */
export const getConfigValue = reference => config.get(reference)

export const hasConfigValue = reference => config.has(reference)

/**
 * Show Feature
 *
 * Helper method for config feature toggling
 *
 * @param feature
 * @return boolean
 */
export const showFeature = feature => config.get(`feature.${feature}`)

/**
 * get Environment Config Value
 *
 * This can be used to access the environment configuration values.
 *
 * Example: 'isTerraformEnvironment' will return if this is an environment where
 * we are using terraform files ie. an ASE environment.
 *
 * 'hostEnvironment' will return what the host environment is set as ie. 'ithc', 'aat'.
 *
 * @see values.yaml
 * @param reference
 */
export const getEnvironmentConfigValue = reference => config.get(`environment.${reference}`)

/**
 * Generate Environment Check Text
 *
 * We generate text to be used for debugging purposes, so as the person attempting to initialise the application knows
 * what the NODE_CONFIG_ENV is set as and what config file is being used.
 */
export const environmentCheckText = () => `NODE_CONFIG_ENV is set as ${process.env.NODE_CONFIG_ENV} therefore we are using the default config.`

/**
 * Get Protocol
 *
 * If running locally we return 'http'
 *
 * @returns {string | string}
 */
export const getProtocol = () => getEnvironment() === DEVELOPMENT ? HTTP : getConfigValue(PROTOCOL)
