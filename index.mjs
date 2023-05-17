import { Temporal, Intl } from "@js-temporal/polyfill"

const startTime = Temporal.PlainTime.from("10:00")
const inputDate = process.argv[2]
if (inputDate === undefined) throw Error("must provide a start date")
const inputTz = process.argv[3]
if (inputTz === undefined) throw Error("must provide a meeting timezone")
const startDate = Temporal.PlainDate.from(inputDate)
const timeZone = Temporal.TimeZone.from(inputTz)
const days = 4

const showTimeZones = [
    "America/Los_Angeles",
    "America/Chicago",
    "Europe/London",
    "Europe/Madrid",
]

const startFormatter = Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
})

const endFormatter = Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
})

const baseTime = startDate.toZonedDateTime({
    timeZone: timeZone,
    plainTime: startTime,
})

function spans(time, tz) {
    time = time.withTimeZone(Temporal.TimeZone.from(tz))
    return {
        am: [time, time.add({ hours: 2 })],
        pm: [time.add({ hours: 3 }), time.add({ hours: 5 })],
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

    timeRow.push(
        current.toPlainDate().toString(),
        amText.join("\n"),
        pmText.join("\n")
    )

    current = current.add({ days: 1 })
}

console.log(timeRow.join("\n\n"))
