/**
 * Backstory: We're going to have a major launch of a new feature tomorrow and the product team forgot to add metrics.
 * So we need a last-minute solution to be able to know its popularity in realtime.
 * Our CEO has pulled us in to tell us that we only need to be able to answer one question: "How many hits have we received in the last 5 minutes?"
 *
 *
 * const handler() {
 *   trackHit()
 *
 * }
 *
 */

const hits = new Map<number, number>()

function getNowInSeconds() {
  return Math.floor(Date.now() / 1000)
}

function getFiveMinutesAgoInSeconds(seconds: number) {
  return seconds - 5 * 60
}

export function trackHit() {
  const nowInSeconds = getNowInSeconds()
  cleanUp()

  if (hits.has(nowInSeconds)) {
    hits.set(nowInSeconds, (hits.get(nowInSeconds) as number) + 1)
  } else {
    hits.set(nowInSeconds, 1)
  }
}

export function getHitCountInLast5Minutes() {
  // 1. Get the current time in seconds
  const nowInSeconds = getNowInSeconds()

  // 2. Get the time 5 minutes ago in seconds
  const fiveMinutesAgoInSeconds = getFiveMinutesAgoInSeconds(nowInSeconds)

  // 3. Iterate over the hits map and sum up the hits that are within the last 5 minutes
  let sum = 0

  for (const [timestamp, hitCount] of hits) {
    if (timestamp >= fiveMinutesAgoInSeconds) {
      sum += hitCount
    }
  }

  cleanUp()

  // 4. Return the sum
  return sum
}

const cleanUp = () => {
  // 1. Get the current time in seconds
  const nowInSeconds = getNowInSeconds()

  // 2. Get the time 5 minutes ago in seconds
  const fiveMinutesAgoInSeconds = getFiveMinutesAgoInSeconds(nowInSeconds)

  // 3. Iterate over the hits map and delete the hits that are older than 5 minutes
  for (const [timestamp, hitCount] of hits) {
    if (timestamp < fiveMinutesAgoInSeconds) {
      hits.delete(timestamp)
    }
  }

  // 4. Return the sum
  return hits
}
