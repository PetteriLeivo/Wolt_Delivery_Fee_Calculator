import { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CalendarAndClock from './CalendarAndClock';
import {calculateTheWholeDeliveryFee} from './calculator'



const DeliveryFeeResult = ({ deliveryFee }: { deliveryFee: number | null }): JSX.Element => {
    
    if (deliveryFee !== null) {
        return <div>Delivery fee is {deliveryFee}</div>
    }
    else {
        return <div></div>
    }
}



const InputForm = () => {
    const [startDate, setStartDate] = useState(new Date())
    const [calculatedDeliveryFee, setCalculatedDeliveryFee] = useState<number | null>(null)

    const formik = useFormik({
        initialValues: {
            cartValue: '',
            delivery_distance_in_meters: '',
            amount_of_items: '',

        },
        onSubmit: values => {
            let cartValue: number = parseFloat(values.cartValue)
            let deliveryDistance: number = parseFloat(values.delivery_distance_in_meters)
            let numberOfItems: number = parseFloat(values.amount_of_items)
            console.log(startDate)

            setCalculatedDeliveryFee(calculateTheWholeDeliveryFee(cartValue, deliveryDistance, numberOfItems, startDate))
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

        <div>
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
                                <label style={{ paddingRight: "20px" }} htmlFor="Time">Time</label>

                            </td>
                            <td>       <CalendarAndClock startDate={startDate} setStartDate={setStartDate} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit">Calculate delivery price</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <DeliveryFeeResult deliveryFee={calculatedDeliveryFee} />
        </div>

    )

}

export default InputForm