#!/usr/bin/env node

import { Temporal } from "@js-temporal/polyfill"

const startTime = Temporal.PlainTime.from("10:00")
const inputDate = process.argv[2]
if (inputDate === undefined) throw Error("must provide a start date")
const inputTz = process.argv[3]
if (inputTz === undefined) throw Error("must provide a meeting timezone")
const startDate = Temporal.PlainDate.from(inputDate)
const timeZone = Temporal.TimeZone.from(inputTz)
const days = 4

const showTimeZones = [
    // CLDR abbreviations are locale specific so we need to provide different locales for the desired short TZ names
    ["America/Los_Angeles", "en-US"],
    ["America/Chicago", "en-US"],
    ["Europe/London", "en-GB"],
    ["Europe/Madrid", "en-GB"],
]

const formatOptions = {
    hour: "numeric",
    minute: "2-digit",
}

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

function formatSpan(span, locale) {

    return `${span[0].toLocaleString(
        locale,
        formatOptions
    )} to ${span[1].toLocaleString(locale, {
        ...formatOptions,
        timeZoneName: "short",
    })}`
}

let current = baseTime
const timeRow = []
for (let i = 0; i < days; i++) {
    let amText = []
    let pmText = []

    for (const zone of showTimeZones) {
        const [z,l] = zone
        const zoneSpans = spans(current, z)
        amText.push(formatSpan(zoneSpans.am, l))
        pmText.push(formatSpan(zoneSpans.pm, l))
    }

    timeRow.push(
        current.toPlainDate().toString(),
        amText.join("\n"),
        pmText.join("\n")
    )

    current = current.add({ days: 1 })
}

console.log(timeRow.join("\n\n"))
