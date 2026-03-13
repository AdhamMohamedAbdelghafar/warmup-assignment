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
    // TODO: Implement this function
}

// ============================================================
// Function 5: addShiftRecord(textFile, shiftObj)
// textFile: (typeof string) path to shifts text file
// shiftObj: (typeof object) has driverID, driverName, date, startTime, endTime
// Returns: object with 10 properties or empty object {}
// ============================================================
function addShiftRecord(textFile, shiftObj) {
    // TODO: Implement this function
}

// ============================================================
// Function 6: setBonus(textFile, driverID, date, newValue)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// date: (typeof string) formatted as yyyy-mm-dd
// newValue: (typeof boolean)
// Returns: nothing (void)
// ============================================================
function setBonus(textFile, driverID, date, newValue) {
    // TODO: Implement this function
}

// ============================================================
// Function 7: countBonusPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof string) formatted as mm or m
// Returns: number (-1 if driverID not found)
// ============================================================
function countBonusPerMonth(textFile, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 8: getTotalActiveHoursPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getTotalActiveHoursPerMonth(textFile, driverID, month) {
    // TODO: Implement this function
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
    // TODO: Implement this function
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
    // TODO: Implement this function
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
