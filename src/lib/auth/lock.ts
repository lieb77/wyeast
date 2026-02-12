import { RuntimeLock } from '@atproto/oauth-client-node'
import Redis from 'ioredis'
import Redlock from 'redlock'

const redisClients = new Redis()
const redlock = new Redlock(redisClients)

const requestLock: RuntimeLock = async (key, fn) => {
  // 30 seconds should be enough. Since we will be using one lock per user id
  // we can be quite liberal with the lock duration here.
  const lock = await redlock.lock(key, 45e3)
  try {
    return await fn()
  } finally {
    await redlock.unlock(lock)
  }
}
