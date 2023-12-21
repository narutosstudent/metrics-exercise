# Metrics

Coding exercise.

## Top 5 questions to start with

1. How is "a hit" defined in this context?: Clarifies what constitutes a hit - a page view, a button click, etc. Understanding this helps in designing the tracking logic correctly.

2. What is the expected traffic volume?: Helps in anticipating the load and choosing an appropriately scalable solution.

3. Is real-time reporting required, or can it be slightly delayed?: Understanding the real-time aspect is crucial for designing the data aggregation and reporting logic.

4. Are there any data retention policies or privacy concerns to consider?: Important for compliance with data protection regulations and determining data storage strategies.

5. Is this a temporary solution for the launch, or should it be designed for long-term use?: Influences the choice between a quick, possibly less robust solution, and a more durable, maintainable one.

## 1. `Math.floor(Date.now() / 1000)`

- **What It Does**: `Date.now()` returns the current time in milliseconds since the Unix Epoch (January 1, 1970). Dividing this value by 1000 converts it into seconds. `Math.floor` then rounds this value down to the nearest whole number.
- **Why It's Used**: We use this to create a timestamp in seconds rather than milliseconds, which is sufficient for our use case and reduces the granularity of our data.

**Visual Example**:

```markdown
Current Time: Date.now() = 1633023005000 ms (e.g., Oct 1, 2021, 00:10:05.000)
Converted to seconds: 1633023005000 / 1000 = 1633023005.000 seconds
Rounded down: Math.floor(1633023005.000) = 1633023005 seconds
```

## 2. `seconds - 5 * 60`

- **What It Does**: This subtracts 5 minutes (expressed in seconds) from the given timestamp. Since there are 60 seconds in a minute, `5 * 60` calculates the number of seconds in 5 minutes.

- **Why It's Used**: It calculates the timestamp that was exactly 5 minutes ago from a given point in time.

**Visual Example**:

```markdown
Current Timestamp: 1633023005 seconds
5 minutes in seconds: 5 \* 60 = 300 seconds
Timestamp 5 minutes ago: 1633023005 - 300 = 1633022705 seconds
```

### 3. `timestamp >= fiveMinutesAgoInSeconds`

- **What It Does**: This checks if a given timestamp is within the last 5 minutes. It compares each timestamp in the `hits` map with the timestamp that represents the time 5 minutes ago. If the timestamp is greater than or equal to the timestamp 5 minutes ago, it is within the last 5 minutes. Because greater than timestamp 5 minutes ago means it is more recent, and equal to timestamp 5 minutes ago means it is exactly 5 minutes ago.

- **Why It's Used**: To include only the hits that occurred within the last 5 minutes in our count.

**Visual Example**:

```markdown
Timestamp of a hit: 1633022900 seconds (e.g., Oct 1, 2021, 00:08:20)
Timestamp 5 minutes ago: 1633022705 seconds (e.g., Oct 1, 2021, 00:05:05)
Is the hit within the last 5 minutes? 1633022900 >= 1633022705? Yes.
```

### 4. `timestamp < fiveMinutesAgoInSeconds`

- **What It Does**: This condition is used to identify timestamps in the `hits` map that are older than 5 minutes.
- **Why It's Used**: To clean up and remove hits that are no longer relevant for our 5-minute window calculation.

**Visual Example**:

```markdown
Timestamp of a hit: 1633022600 seconds (e.g., Oct 1, 2021, 00:03:20)
Timestamp 5 minutes ago: 1633022705 seconds (e.g., Oct 1, 2021, 00:05:05)
Is the hit older than 5 minutes? 1633022600 < 1633022705? Yes.
```
