import { useFormik } from 'formik';
import * as Yup from 'yup';

const smallCartValueSurcharge = (cartValue: number) => {
    let surcharge: number = 0
    if (cartValue < 10) {
        surcharge = (10 - cartValue)
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

const InputForm = () => {
    const formik = useFormik({
        initialValues: {
            cartValue: '',
            delivery_distance_in_meters: '',
            amount_of_items: '',

        },
        onSubmit: values => {
            let cartValue = parseFloat(values.cartValue)
            let deliveryDistance = parseFloat(values.delivery_distance_in_meters)
            let numberOfItems = parseFloat(values.amount_of_items)
            let surcharge: number = smallCartValueSurcharge(cartValue)
            console.log("small order surcharge", surcharge)

            let maxinumDeliveryFee: number = 15
            let distanceDeliveryFee: number = calculateFeeFromDeliveryDistance(deliveryDistance)

            console.log("delivery fee from distance", distanceDeliveryFee)

            let itemsFee: number = bigOrderSurcharge(numberOfItems)
            console.log("items fee", itemsFee)


            alert(JSON.stringify(values, null, 2))
        },
        validationSchema: Yup.object({
            cartValue: Yup.number()
                .typeError("Cart value must be number")
                .positive("Cart value must be greater than zero")
                .required('Required'),
            delivery_distance_in_meters: Yup.number()
                .typeError("Delivery distance must be number")
                .integer("Delivery distance must be integer")
                .positive("Delivery distance must be greater than zero")
                .required('Required'),
            amount_of_items: Yup.number()
                .typeError("Amount of items must be number")
                .integer("Amount of items must be integer")
                .positive("Amount of items must be greater than zero")
                .required('Required'),

        })
    })

    return (

        <form onSubmit={formik.handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label style={{ paddingRight: "20px" }} htmlFor="cartValue">Cart value</label>
                        </td>
                        <td>
                            <input
                                id="cartValue"
                                name="cartValue"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.cartValue}
                            />
                        </td>
                        <td style={{ paddingLeft: "10px" }}>
                            €
                        </td>

                        {formik.touched.cartValue && formik.errors.cartValue ? (
                            <td style={{ color: "#DC143C" }}>{formik.errors.cartValue}</td>
                        ) : null}

                    </tr>


                    <tr>
                        <td>
                            <label style={{ paddingRight: "20px" }} htmlFor="delivery_distance_in_meters">Delivery distance</label>
                        </td>
                        <td>
                            <input
                                id="delivery_distance_in_meters"
                                name="delivery_distance_in_meters"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.delivery_distance_in_meters}
                            />
                        </td>
                        <td style={{ paddingLeft: "10px" }}>
                            m
                        </td>

                        {formik.touched.delivery_distance_in_meters && formik.errors.delivery_distance_in_meters ? (
                            <td style={{ color: "#DC143C" }}>{formik.errors.delivery_distance_in_meters}</td>
                        ) : null}

                    </tr>

                    <tr>
                        <td>
                            <label style={{ paddingRight: "20px" }} htmlFor="amount_of_items">Amount of items</label>
                        </td>
                        <td>
                            <input
                                id="amount_of_items"
                                name="amount_of_items"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.amount_of_items}
                            />
                        </td>
                        <td style={{ paddingLeft: "10px" }}>
                        </td>
                        {formik.touched.amount_of_items && formik.errors.amount_of_items ? (
                            <td style={{ color: "#DC143C" }}>{formik.errors.amount_of_items}</td>
                        ) : null}

                    </tr>
                    <tr>
                        <td>
                            <button type="submit">Calculate delivery price</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>


    )

}

export default InputForm