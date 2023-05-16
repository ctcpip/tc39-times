import { Temporal, Intl } from "@js-temporal/polyfill"

// CONFIGURATION, UPDATE AS NEEDED
const startTime = Temporal.PlainTime.from("10:00")
const startDate = Temporal.PlainDate.from("2023-01-30")
const timeZone = Temporal.TimeZone.from("America/New_York")
const days = 4

const showTimeZones = [
    "America/Los_Angeles",
    "America/Chicago",
    "Europe/London",
    "Europe/Madrid",
]

// CODE
const startFormatter = Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
})

const endFormatter = Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
})

const baseTime = Temporal.Now.zonedDateTimeISO()
    .withTimeZone(timeZone)
    .withPlainDate(startDate)
    .withPlainTime(startTime)

function spans(time, tz) {
    time = time.withTimeZone(Temporal.TimeZone.from(tz))
    return {
        am: [time, time.add({ hours: 2 })],
        pm: [time.add({ hours: 3 }), time.add({ hours: 6 })],
    }
}

function formatSpan(span) {
    return `${startFormatter.format(span[0])} to ${endFormatter.format(
        span[1]
    )}`
}

let current = baseTime
const timeRow = []
for (let i = 0; i < days; i++) {
    let amText = []
    let pmText = []

    for (const zone of showTimeZones) {
        const zoneSpans = spans(current, zone)
        amText.push(formatSpan(zoneSpans.am))
        pmText.push(formatSpan(zoneSpans.pm))
    }

    timeRow.push(amText.join("\n"), pmText.join("\n"))

    current = current.add({ days: 1 })
}

console.log(timeRow.map((cell) => `"${cell}"`).join(","))
