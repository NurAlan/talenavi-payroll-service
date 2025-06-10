import {argon2id, hash, verify} from 'argon2'

/**
 * 
 * @param {String} text 
 * @returns {Promise<string>}
 */
export const hashsing = async(text) => {
  try {
    const generate = await hash(text, {
      timeCost: 4,
      memoryCost: 2 ** 16,
      type: argon2id,
      parallelism: 1
    }).catch((err) => {
      throw err;
    })
    return generate
  } catch (error) {
    throw new Error('Hashing failed: ' + error.message)
  }
}

/**
 * 
 * @param {String} encrypted 
 * @param {String} text 
 * @returns {Promise<Boolean>}
 */
export const verifyhash = async (encrypted, text) => {
  try {
    const result = await verify(encrypted, text, {
      timeCost: 4,
      memoryCost: 2 ** 16,
      type: argon2id,
      parallelism: 1
    }).catch((err) => {
      throw err
    })
    return result
  } catch (error) {
    throw new Error('Verification failed: ' + error.message)
  }
}

export default {
  hashsing
}