import { smallCartValueSurcharge, calculateFeeFromDeliveryDistance, bigOrderSurcharge, calculateTheWholeDeliveryFee } from './calculator'


test('calculates delivery based on distance correctly', () => {
    expect(calculateFeeFromDeliveryDistance(1)).toBe(1)
    expect(calculateFeeFromDeliveryDistance(1000)).toBe(2)
    expect(calculateFeeFromDeliveryDistance(1499)).toBe(3)
    expect(calculateFeeFromDeliveryDistance(1500)).toBe(3)
    expect(calculateFeeFromDeliveryDistance(1501)).toBe(4)
})

test('Calculates small order surcharge correctly', () => {
    expect(smallCartValueSurcharge(8.90)).toBe(1.10)
})

test('Calculates big order surcharge correctly', () => {
    expect(bigOrderSurcharge(4)).toBe(0)
    expect(bigOrderSurcharge(5)).toBe(0.5)
    expect(bigOrderSurcharge(10)).toBe(3)
    expect(bigOrderSurcharge(13)).toBe(5.7)
})

test('Calculates the whole delivery fee correctly', () => {
    expect(calculateTheWholeDeliveryFee(100, 1, 1, new Date())).toBe(0)
    expect(calculateTheWholeDeliveryFee(10, 1, 1, new Date('Jan 27 2023 17:00:00 GMT+0000'))).toBe(1.2)
    expect(calculateTheWholeDeliveryFee(10, 1, 1000, new Date('Jan 27 2023 17:00:00 GMT+0000'))).toBe(15)
})

