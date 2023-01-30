
const smallCartValueSurcharge = (cartValue: number) => {
    let surcharge: number = 0
    if (cartValue < 10) {
        surcharge = Math.round((10 - cartValue) * 100) / 100
    }
    return surcharge

}

const calculateFeeFromDeliveryDistance = (deliveryDistance: number) => {
    let miniumDeliveryFee: number = 1
    if (deliveryDistance < 1000) {
        return 1
    }
    else {
        let multiplier: number = (deliveryDistance - miniumDeliveryFee) / 500
        let roundedDownMultiplier = Math.floor(multiplier)
        let deliveryFee: number = miniumDeliveryFee + roundedDownMultiplier * 1

        return deliveryFee
    }
}

const bigOrderSurcharge = (amountOfItems: number) => {
    let bulkFee: number = 0

    if (amountOfItems > 4 && amountOfItems < 13) {
        let bulkfeeMultiplier: number = amountOfItems - 4
        bulkFee = 0.5 * bulkfeeMultiplier
    }

    if (amountOfItems > 12) {
        let bulkfeeMultiplier: number = amountOfItems - 4
        bulkFee = 0.5 * bulkfeeMultiplier + 1.20
    }
    return bulkFee

}

const calculateTheWholeDeliveryFee = (cartValue: number, deliveryDistance: number, numberOfItems: number, startDate: Date) => {
    let theWholeDeliveryFee: number = 0


    if (cartValue >= 100) {
        theWholeDeliveryFee = 0
        console.log("cartValue is 100 or more and delivery fee is ", theWholeDeliveryFee)
        return (
            theWholeDeliveryFee
        )
    }
    else {
        let weekDayNumber: number = startDate.getUTCDay()
        let utcHours: number = startDate.getUTCHours()
        let utcMinutes: number = startDate.getMinutes()
        let fridayRushMultiplier: number = 1;

        if (weekDayNumber === 5 && utcHours >= 15 && utcHours <= 19) {
            if (utcHours === 19 && utcMinutes > 0) {
                console.log("friday rush has just stopped")
            }
            else {
                console.log("friday rush")
                fridayRushMultiplier = 1.2
            }
        }

        let smallOrderSurcharge: number = smallCartValueSurcharge(cartValue)
        console.log("small order surcharge", smallOrderSurcharge)

        let distanceDeliveryFee: number = calculateFeeFromDeliveryDistance(deliveryDistance)

        console.log("delivery fee from distance", distanceDeliveryFee)

        let amountOfItemsFee: number = bigOrderSurcharge(numberOfItems)
        console.log("items fee", amountOfItemsFee)

        theWholeDeliveryFee = fridayRushMultiplier * (smallOrderSurcharge + distanceDeliveryFee + amountOfItemsFee)
        let maxinumDeliveryFee: number = 15
        if (theWholeDeliveryFee < 15) {
            console.log("the whole delivery fee", theWholeDeliveryFee)
            return theWholeDeliveryFee

        }
        else {
            console.log(theWholeDeliveryFee, "is bigger than", maxinumDeliveryFee, " so delivery fee is ", maxinumDeliveryFee)
            theWholeDeliveryFee = maxinumDeliveryFee
            return theWholeDeliveryFee

        }


    }

}

export { smallCartValueSurcharge, calculateFeeFromDeliveryDistance, bigOrderSurcharge, calculateTheWholeDeliveryFee }