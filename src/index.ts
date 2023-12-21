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
  cleanUp() // Clean up before tracking a new hit

  const currentCount = hits.get(nowInSeconds) ?? 0
  hits.set(nowInSeconds, currentCount + 1)
}

export function getHitCountInLast5Minutes() {
  cleanUp() // Clean up before calculating the hit count

  const nowInSeconds = getNowInSeconds()
  const fiveMinutesAgoInSeconds = getFiveMinutesAgoInSeconds(nowInSeconds)

  let sum = 0
  for (const [timestamp, hitCount] of hits) {
    if (timestamp >= fiveMinutesAgoInSeconds) {
      sum += hitCount
    }
  }

  return sum
}

const cleanUp = () => {
  const nowInSeconds = getNowInSeconds()
  const fiveMinutesAgoInSeconds = getFiveMinutesAgoInSeconds(nowInSeconds)

  for (const [timestamp, _] of hits) {
    if (timestamp < fiveMinutesAgoInSeconds) {
      hits.delete(timestamp)
    }
  }
}
