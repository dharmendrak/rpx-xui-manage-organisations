import * as propertiesVolume from '@hmcts/properties-volume'
import * as config from 'config'
import {ALT_SECRETS_MOUNT, FEATURE_ALT_SECRETS_MOUNT_ENABLED, PROTOCOL} from './references'

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

  if (useAlternativeSecretsMount()) {
    propertiesVolume.addTo(config, { mountPoint: getConfigValue(ALT_SECRETS_MOUNT)})
    return
  }

  propertiesVolume.addTo(config)
}

/**
 * Use Alternative Secrets Mount Point
 *
 * Set the FEATURE_ALT_SECRETS_MOUNT_ENABLED to true using the .env file to set up
 * the application so that it uses an alternative mount point set by ALT_SECRETS_MOUNT.
 *
 * @returns {any}
 */
export const useAlternativeSecretsMount = () => showFeature(FEATURE_ALT_SECRETS_MOUNT_ENABLED)

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

/**
 * Has Configuration Value
 *
 * @param reference
 */
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
 * Get Protocol
 *
 * @returns http / https
 */
export const getProtocol = () => getConfigValue(PROTOCOL)
