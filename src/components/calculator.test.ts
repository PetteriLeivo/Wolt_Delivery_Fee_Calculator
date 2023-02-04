import { smallCartValueSurcharge, calculateFeeFromDeliveryDistance, bigOrderSurcharge, calculateTheWholeDeliveryFee } from './calculator'
import { expect, test } from '@jest/globals'


test('calculates delivery based on distance correctly', () => {
    expect(calculateFeeFromDeliveryDistance(1)).toBe(1)
    expect(calculateFeeFromDeliveryDistance(1000)).toBe(2)
    // Example 1: If the delivery distance is 1499 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€.
    expect(calculateFeeFromDeliveryDistance(1499)).toBe(3)
    // Example 2: If the delivery distance is 1500 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€.
    expect(calculateFeeFromDeliveryDistance(1500)).toBe(3)
    // Example 3: If the delivery distance is 1501 meters, the delivery fee is: 2€ base fee + 1€ for the first 500 m + 1€ for the second 500 m => 4€.
    expect(calculateFeeFromDeliveryDistance(1501)).toBe(4)
})

test('Calculates small order surcharge correctly', () => {
    // For example if the cart value is 8.90€, the surcharge will be 1.10€.
    expect(smallCartValueSurcharge(8.90)).toBe(1.10)
})

test('Calculates big order surcharge correctly', () => {
    // Example 1: If the number of items is 4, no extra surcharge.
    expect(bigOrderSurcharge(4)).toBe(0)
   // Example 2: If the number of items is 5, 50 cents surcharge is added.
    expect(bigOrderSurcharge(5)).toBe(0.5)
    // Example 3: If the number of items is 10, 3€ surcharge (6 x 50 cents) is added.
    expect(bigOrderSurcharge(10)).toBe(3)
    // Example 4: If the number of items is 13, 5,70€ surcharge is added ((9 * 50 cents) + 1,20€).
    expect(bigOrderSurcharge(13)).toBe(5.7)
})

test('Calculates the whole delivery fee correctly', () => {
    expect(calculateTheWholeDeliveryFee(100, 1, 1, new Date())).toBe(0)
    /** Cart value is 10 and amount of items 1, which means no surcharges. Minium delivery fee is 1.
     * but Friday rush is between (3 - 7 PM UTC), so the expected value for the delivery fee is 1.2.
    */
    expect(calculateTheWholeDeliveryFee(10, 1, 1, new Date('Jan 27 2023 17:00:00 GMT+0000'))).toBe(1.2)
    // The delivery fee can never be more than 15€.
    expect(calculateTheWholeDeliveryFee(99, 999, 999, new Date('Jan 27 2023 17:00:00 GMT+0000'))).toBe(15)
})

