const fs = require("fs");

// ============================================================
// Function 1: getShiftDuration(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function getShiftDuration(startTime, endTime) {
    let start = startTime.trim().split(" ")
    let end = endTime.trim().split(" ")

    let starttimes = start[0].split(":")
    let endtimes = end[0].split(":")

    let starttimesIntH = parseInt(starttimes[0])
    let starttimesIntM = parseInt(starttimes[1])
    let starttimesIntS = parseInt(starttimes[2])

    let endtimesIntH = parseInt(endtimes[0])
    let endtimesIntM = parseInt(endtimes[1])
    let endtimesIntS = parseInt(endtimes[2])

    if (start[1].toLowerCase() == "pm" && starttimesIntH != 12) {starttimesIntH = starttimesIntH + 12}  
    if (start[1].toLowerCase() == "am" && starttimesIntH == 12) {starttimesIntH = 24}

    if (end[1].toLowerCase() == "pm" && endtimesIntH != 12) {endtimesIntH = endtimesIntH + 12}
    if (end[1].toLowerCase() == "am" && endtimesIntH == 12) {endtimesIntH =24}

    
    let startTotal = starttimesIntH * 3600 + starttimesIntM * 60 + starttimesIntS
    let endTotal = endtimesIntH * 3600 + endtimesIntM * 60 + endtimesIntS

    let diff = endTotal - startTotal

    let diffHour = Math.floor(diff / 3600)
    diff = diff % 3600

    let diffMinute = Math.floor(diff / 60)
    let diffSecond = diff % 60

    if (diffMinute < 10) { diffMinute = "0" + diffMinute}
    if (diffSecond < 10) {diffSecond = "0" + diffSecond}
        
    return diffHour + ":" + diffMinute + ":" + diffSecond
}

// ============================================================
// Function 2: getIdleTime(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function getIdleTime(startTime, endTime) {

    let start = startTime.trim().split(" ")
    let end = endTime.trim().split(" ")

    let starttimes = start[0].split(":")
    let endtimes = end[0].split(":")

    let starttimesIntH = parseInt(starttimes[0])
    let starttimesIntM = parseInt(starttimes[1])
    let starttimesIntS = parseInt(starttimes[2])

    let endtimesIntH = parseInt(endtimes[0])
    let endtimesIntM = parseInt(endtimes[1])
    let endtimesIntS = parseInt(endtimes[2])

    if(start[1].toLowerCase() == "pm" && starttimesIntH != 12){starttimesIntH = starttimesIntH + 12}
    if(start[1].toLowerCase() == "am" && starttimesIntH == 12){starttimesIntH = 0}
    if(end[1].toLowerCase() == "pm" && endtimesIntH != 12){endtimesIntH = endtimesIntH + 12}
    if(end[1].toLowerCase() == "am" && endtimesIntH == 12){endtimesIntH = 0}

    let startTotal = starttimesIntH * 3600 + starttimesIntM * 60 + starttimesIntS
    let endTotal = endtimesIntH * 3600 + endtimesIntM * 60 + endtimesIntS

    let morningStart = 8*3600
    let nightEnd = 22*3600

    let idle = 0

    if(startTotal < morningStart){idle = idle + (morningStart - startTotal)}
    if(endTotal > nightEnd){idle = idle + (endTotal - nightEnd)}

    let idleHour = Math.floor(idle/3600)
    idle = idle %3600

    let idleMinute = Math.floor(idle/60)
    let idleSecond = idle%60

    if(idleMinute < 10){idleMinute = "0"+idleMinute}
    if(idleSecond < 10){idleSecond = "0"+idleSecond}

return idleHour + ":" + idleMinute+":" + idleSecond
}

// ============================================================
// Function 3: getActiveTime(shiftDuration, idleTime)
// shiftDuration: (typeof string) formatted as h:mm:ss
// idleTime: (typeof string) formatted as h:mm:ss
// Returns: string formatted as h:mm:ss
// ============================================================
function getActiveTime(shiftDuration, idleTime) {

    let shift = shiftDuration.split(":")
    let idle = idleTime.split(":")

    let shiftH = parseInt(shift[0])
    let shiftM = parseInt(shift[1])
    let shiftS = parseInt(shift[2])

    let idleH = parseInt(idle[0])
    let idleM = parseInt(idle[1])
    let idleS = parseInt(idle[2])

    let shiftTotal = shiftH * 3600 + shiftM * 60 + shiftS
    let idleTotal = idleH *3600 + idleM * 60 + idleS

    let diff = shiftTotal - idleTotal 

    let activeHour = Math.floor(diff / 3600)
    diff = diff % 3600

    let activeMinute = Math.floor(diff / 60)
    let activeSecond = diff % 60

    if(activeMinute < 10){activeMinute = "0" + activeMinute}
    if(activeSecond < 10){activeSecond = "0" + activeSecond}
    
    return activeHour + ":" + activeMinute + ":" + activeSecond
}

// ============================================================
// Function 4: metQuota(date, activeTime)
// date: (typeof string) formatted as yyyy-mm-dd
// activeTime: (typeof string) formatted as h:mm:ss
// Returns: boolean
// ============================================================
function metQuota(date, activeTime) {

let time = activeTime.split(":")

let Hour = parseInt(time[0])
let Minute = parseInt(time[1])
let Second = parseInt(time[2])

let activeTotal = Hour * 3600 + Minute * 60 + Second 

let quota
if(date >= "2025-04-10" && date <="2025-04-30"){quota = 6 * 3600}
else{quota = 8 * 3600 + 24 * 60}
if(activeTotal >= quota){return true}
else{return false} 
}

// ============================================================
// Function 5: addShiftRecord(textFile, shiftObj)
// textFile: (typeof string) path to shifts text file
// shiftObj: (typeof object) has driverID, driverName, date, startTime, endTime
// Returns: object with 10 properties or empty object {}
// ============================================================
function addShiftRecord(textFile, shiftObj){

let content = fs.readFileSync(textFile, "utf8")
let lines = content.trim().split("\n")

for(let i = 0; i < lines.length; i++){let row = lines[i].split(",")
if(row[0] == shiftObj.driverID && row[2] == shiftObj.date){
        return {}
}
}

let shiftDurationValue = getShiftDuration(shiftObj.startTime, shiftObj.endTime)
let idleTimeValue = getIdleTime(shiftObj.startTime, shiftObj.endTime)
let activeTimeValue = getActiveTime(shiftDurationValue, idleTimeValue)
let metQuotaValue = metQuota(shiftObj.date, activeTimeValue)

let newShift = {
    driverID: shiftObj.driverID,
    driverName: shiftObj.driverName,
    date: shiftObj.date,
    startTime: shiftObj.startTime,
    endTime: shiftObj.endTime,
    shiftDuration: shiftDurationValue,
    idleTime: idleTimeValue,
    activeTime: activeTimeValue,
    metQuota: metQuotaValue,
    hasBonus: false
}

let newLine = newShift.driverID + "," +
              newShift.driverName + "," +
              newShift.date + "," +
              newShift.startTime + "," +
              newShift.endTime + "," +
              newShift.shiftDuration + "," +
              newShift.idleTime + "," +
              newShift.activeTime + "," +
              newShift.metQuota + "," +
              newShift.hasBonus

let lastIndex = -1

for(let i = 0; i < lines.length; i++){
    let row = lines[i].split(",")
    if(row[0] == shiftObj.driverID){lastIndex = i}

if(lastIndex == -1){lines.push(newLine)}
else{lines.splice(lastIndex + 1, 0, newLine)}

fs.writeFileSync(textFile, lines.join("\n"))

return newShift
}}

// ============================================================
// Function 6: setBonus(textFile, driverID, date, newValue)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// date: (typeof string) formatted as yyyy-mm-dd
// newValue: (typeof boolean)
// Returns: nothing (void)
// ============================================================
function setBonus(textFile, driverID, date, newValue) {

let content = fs.readFileSync(textFile, "utf8")
let lines = content.trim().split("\n")

for(let i = 0; i < lines.length; i++){let row = lines[i].split(",")

    if(row[0] == driverID && row[2] == date){
        row[9] = String(newValue)
        lines[i] = row.join(",")}}

fs.writeFileSync(textFile, lines.join("\n"))
}

// ============================================================
// Function 7: countBonusPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof string) formatted as mm or m
// Returns: number (-1 if driverID not found)
// ============================================================
function countBonusPerMonth(textFile, driverID, month) {

let content = fs.readFileSync(textFile, "utf8")
let lines = content.trim().split("\n")

let count = 0
let foundDriver = false
let monthNumber = parseInt(month)

for(let i = 0; i < lines.length; i++){
    let row = lines[i].split(",")

    let rowDriverID = row[0].trim()
    let rowDate = row[2].trim()
    let rowBonus = row[9].trim()

    let dateParts = rowDate.split("-")
    let rowMonth = parseInt(dateParts[1])

    if(rowDriverID == driverID){
        foundDriver = true

        if(rowMonth == monthNumber && rowBonus == "true"){
            count = count + 1}}}

if(foundDriver == false){return -1}

return count
}

// ============================================================
// Function 8: getTotalActiveHoursPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getTotalActiveHoursPerMonth(textFile, driverID, month) {

let content = fs.readFileSync(textFile, "utf8")
let lines = content.trim().split("\n")

let totalSeconds = 0

for(let i = 0; i < lines.length; i++){
    let row = lines[i].split(",")

    let rowDriverID = row[0].trim()
    let rowDate = row[2].trim()
    let rowActiveTime = row[7].trim()

    let dateParts = rowDate.split("-")
    let rowMonth = parseInt(dateParts[1])

    if(rowDriverID == driverID && rowMonth == month){

        let timeParts = rowActiveTime.split(":")
        let hour = parseInt(timeParts[0])
        let minute = parseInt(timeParts[1])
        let second = parseInt(timeParts[2])

        totalSeconds = totalSeconds + hour * 3600 + minute * 60 + second}}

let totalHour = Math.floor(totalSeconds / 3600)
totalSeconds = totalSeconds % 3600

let totalMinute = Math.floor(totalSeconds / 60)
let totalSecond = totalSeconds % 60

if(totalMinute < 10){totalMinute = "0" + totalMinute}
if(totalSecond < 10){totalSecond = "0" + totalSecond}

return totalHour + ":" + totalMinute + ":" + totalSecond
}

// ============================================================
// Function 9: getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month)
// textFile: (typeof string) path to shifts text file
// rateFile: (typeof string) path to driver rates text file
// bonusCount: (typeof number) total bonuses for given driver per month
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month) {

let rateContent = fs.readFileSync(rateFile, "utf8")
let rateLines = rateContent.trim().split("\n")

let dayOff = ""

for(let i = 0; i < rateLines.length; i++){
    let row = rateLines[i].split(",")

    if(row[0].trim() == driverID){
        dayOff = row[1].trim()
    }
}

let content = fs.readFileSync(textFile, "utf8")
let lines = content.trim().split("\n")

let totalSeconds = 0

for(let i = 0; i < lines.length; i++){
    let row = lines[i].split(",")

    let rowDriverID = row[0].trim()
    let rowDate = row[2].trim()

    let dateParts = rowDate.split("-")
    let rowMonth = parseInt(dateParts[1])

    if(rowDriverID == driverID && rowMonth == month){

        let year = parseInt(dateParts[0])
        let monthNumber = parseInt(dateParts[1]) - 1
        let day = parseInt(dateParts[2])

        let dateObject = new Date(year, monthNumber, day)

        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let dayName = days[dateObject.getDay()]

        if(dayName != dayOff){

            if(rowDate >= "2025-04-10" && rowDate <= "2025-04-30"){
                totalSeconds = totalSeconds + 6 * 3600}
            else{
                totalSeconds = totalSeconds + 8 * 3600 + 24 * 60}}}}

totalSeconds = totalSeconds - bonusCount * 2 * 3600

let totalHour = Math.floor(totalSeconds / 3600)
totalSeconds = totalSeconds % 3600

let totalMinute = Math.floor(totalSeconds / 60)
let totalSecond = totalSeconds % 60

if(totalMinute < 10){totalMinute = "0" + totalMinute}
if(totalSecond < 10){totalSecond = "0" + totalSecond}

return totalHour + ":" + totalMinute + ":" + totalSecond
}

// ============================================================
// Function 10: getNetPay(driverID, actualHours, requiredHours, rateFile)
// driverID: (typeof string)
// actualHours: (typeof string) formatted as hhh:mm:ss
// requiredHours: (typeof string) formatted as hhh:mm:ss
// rateFile: (typeof string) path to driver rates text file
// Returns: integer (net pay)
// ============================================================
function getNetPay(driverID, actualHours, requiredHours, rateFile) {

let content = fs.readFileSync(rateFile, "utf8")
let lines = content.trim().split("\n")

let basePay = 0
let tier = 0

for(let i = 0; i < lines.length; i++){
    let row = lines[i].split(",")

    if(row[0].trim() == driverID){
        basePay = parseInt(row[2].trim())
        tier = parseInt(row[3].trim())}}

let actualParts = actualHours.split(":")
let actualH = parseInt(actualParts[0])
let actualM = parseInt(actualParts[1])
let actualS = parseInt(actualParts[2])

let requiredParts = requiredHours.split(":")
let requiredH = parseInt(requiredParts[0])
let requiredM = parseInt(requiredParts[1])
let requiredS = parseInt(requiredParts[2])

let actualTotal = actualH * 3600 + actualM * 60 + actualS
let requiredTotal = requiredH * 3600 + requiredM * 60 + requiredS

if(actualTotal >= requiredTotal){return basePay}

let missingSeconds = requiredTotal - actualTotal
let allowedHours = 0

if(tier == 1){allowedHours = 50}
else if(tier == 2){allowedHours = 20}
else if(tier == 3){allowedHours = 10}
else if(tier == 4){allowedHours = 3}

let allowedSeconds = allowedHours * 3600
missingSeconds = missingSeconds - allowedSeconds

if(missingSeconds <= 0){return basePay}

let missingHours = Math.floor(missingSeconds / 3600)

let deductionRatePerHour = Math.floor(basePay / 185)
let salaryDeduction = missingHours * deductionRatePerHour
let netPay = basePay - salaryDeduction

return netPay
}
module.exports = {
    getShiftDuration,
    getIdleTime,
    getActiveTime,
    metQuota,
    addShiftRecord,
    setBonus,
    countBonusPerMonth,
    getTotalActiveHoursPerMonth,
    getRequiredHoursPerMonth,
    getNetPay
};
