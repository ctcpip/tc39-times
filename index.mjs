#!/usr/bin/env node

import { Temporal } from "@js-temporal/polyfill"

const startTime = Temporal.PlainTime.from("10:00")
const inputDate = process.argv[2]
if (typeof inputDate === 'undefined') throw Error("must provide a start date")
const timeZone = process.argv[3]
if (typeof timeZone === 'undefined') throw Error("must provide a meeting timezone")
const inputMeetingType = process.argv[4]
if (typeof inputMeetingType === 'undefined') throw Error("must provide a meeting type")
const startDate = Temporal.PlainDate.from(inputDate)
let days;
let isHybridMeeting = false;

switch (inputMeetingType) {
    case "hybrid":
        days = 3;
        isHybridMeeting = true;
        break;
    case "virtual":
        days = 4;
        break;
    default:
        throw new TypeError(`invalid meeting type: '${inputMeetingType}'. valid meeting types: ['hybrid', 'virtual']`)
}

const showTimeZones = [
    // CLDR abbreviations are locale specific so we need to provide different locales for the desired short TZ names
    ["America/Los_Angeles", "en-US"],
    ["America/Chicago", "en-US"],
    ["Europe/London", "en-GB"],
    ["Europe/Madrid", "es-ES"],
]

const formatOptions = {
    hour: "2-digit",
    hour12: false,
    hourCycle: 'h23',
    minute: "2-digit",
}

const baseTime = startDate.toZonedDateTime({
    timeZone: timeZone,
    plainTime: startTime,
})

function spans(time, tz) {
    time = time.withTimeZone(tz)

    return {
        am: [time, time.add({ hours: 2 })],
        pm1: [time.add({ hours: 3 }), time.add({ hours: 5 })],
        pm2: [time.add({ hours: 5 }), time.add({ hours: 7 })],
    }
}

function formatSpan(span, locale) {

    return `${span[0].toLocaleString(
        locale,
        formatOptions
    )}-${span[1].toLocaleString(locale, {
        ...formatOptions,
        timeZoneName: "short",
    })}`
}

let current = baseTime
const timeRow = []
for (let i = 0; i < days; i++) {
    let amText = []
    let pm1Text = []
    let pm2Text = []

    for (const zone of showTimeZones) {
        const [z,l] = zone
        const zoneSpans = spans(current, z)
        amText.push(formatSpan(zoneSpans.am, l))
        pm1Text.push(formatSpan(zoneSpans.pm1, l))

        if(isHybridMeeting) {
            pm2Text.push(formatSpan(zoneSpans.pm2, l))
        }
    }

    timeRow.push(
        current.toPlainDate().toString(),
        amText.join("\n"),
        pm1Text.join("\n"),
        pm2Text.join("\n")
    )

    current = current.add({ days: 1 })
}

console.log(timeRow.join("\n\n"))
