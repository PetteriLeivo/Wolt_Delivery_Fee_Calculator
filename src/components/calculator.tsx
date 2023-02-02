/** Calculates the surcharge which is the difference between the cart value and 10€.*/
const smallCartValueSurcharge = (cartValue: number) => {
    let surcharge: number = 0
    if (cartValue < 10) {
        surcharge = Math.round((10 - cartValue) * 100) / 100
    }
    return surcharge

}

/** The minimum fee is always 1€ even if delivery distance < 500 but minium distance must be > 0
 * 1€ is added for every additional 500 meters that the courier needs to travel before reaching the destination 
 * function returns calculated delivery fee
*/
const calculateFeeFromDeliveryDistance = (deliveryDistance: number) => {
    let miniumDistance: number = 1
    let miniumDeliveryFee: number = 1
    if (deliveryDistance < 1000) {
        return 1
    }
    else {
        let multiplier: number = (deliveryDistance - miniumDistance) / 500
        let roundedDownMultiplier = Math.floor(multiplier)
        let deliveryFee: number = miniumDeliveryFee + roundedDownMultiplier * 1

        return deliveryFee
    }
}

/** 
 * If the number of items is five or more, 
 * an additional 50 cent surcharge is added 
 * for each item above and including the fifth item. 
 * An extra "bulk" fee applies for more than 12 items which is 1,20€ 
 */
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

/** 
 * The delivery is free (0€) when the cart value is equal or more than 100€
 * During the Friday rush (3 - 7 PM UTC), the delivery fee (the total fee including possible surcharges) will be multiplied by 1.2x
 * The delivery fee can never be more than 15€
*/
const calculateTheWholeDeliveryFee = (cartValue: number, deliveryDistance: number, numberOfItems: number, startDate: Date) => {
    let theWholeDeliveryFee: number = 0


    if (cartValue >= 100) {
        theWholeDeliveryFee = 0
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
                //console.log("friday rush has just stopped")
            }
            else {
                fridayRushMultiplier = 1.2
            }
        }

        let smallOrderSurcharge: number = smallCartValueSurcharge(cartValue)

        let distanceDeliveryFee: number = calculateFeeFromDeliveryDistance(deliveryDistance)


        let amountOfItemsFee: number = bigOrderSurcharge(numberOfItems)

        theWholeDeliveryFee = fridayRushMultiplier * (smallOrderSurcharge + distanceDeliveryFee + amountOfItemsFee)
        let maxinumDeliveryFee: number = 15
        if (theWholeDeliveryFee < 15) {
            return theWholeDeliveryFee

        }
        else {
            theWholeDeliveryFee = maxinumDeliveryFee
            return theWholeDeliveryFee

        }
    }
}

export { smallCartValueSurcharge, calculateFeeFromDeliveryDistance, bigOrderSurcharge, calculateTheWholeDeliveryFee }