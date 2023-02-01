import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import CalendarAndClock from './CalendarAndClock';
import { calculateTheWholeDeliveryFee } from './calculator'



const DeliveryFeeResult = ({ deliveryFee }: { deliveryFee: number | null }): JSX.Element => {

    if (deliveryFee !== null) {
        return <div>Delivery fee is: {deliveryFee}</div>
    }
    else {
        return <div></div>
    }

}


interface InputFormProps {
    onSubmit: (values: any) => void,
    startDate: Date,
    setStartDate: React.Dispatch<React.SetStateAction<Date>>,
}

const InputForm = ({ onSubmit, startDate, setStartDate }: InputFormProps): JSX.Element => {

    return (
        <Formik
            initialValues={{
                cartValue: '',
                delivery_distance_in_meters: '',
                amount_of_items: ''
            }}

            validationSchema={Yup.object({

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

            })}

            onSubmit={onSubmit}
        >
            <Form>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label style={{ paddingRight: "20px" }} htmlFor="cartValue">Cart value</label>
                            </td>
                            <td>
                                <Field id="cartValue" name="cartValue" type="text" placeholder="Write cart value" />
                            </td>
                            <td style={{ paddingLeft: "10px" }}>
                                €
                            </td>
                            <td style={{ color: "#DC143C" }}>
                                <ErrorMessage name="cartValue" />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label style={{ paddingRight: "20px" }} htmlFor="delivery_distance_in_meters">Delivery distance</label>
                            </td>
                            <td>
                                <Field id="delivery_distance_in_meters" name="delivery_distance_in_meters" type="text" placeholder="Write delivery distance" />
                            </td>
                            <td style={{ paddingLeft: "10px" }}>
                                m
                            </td>

                            <td style={{ color: "#DC143C" }}>
                                <ErrorMessage name="delivery_distance_in_meters" />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label style={{ paddingRight: "20px" }} htmlFor="amount_of_items">Amount of items</label>
                            </td>
                            <td>
                                <Field id="amount_of_items" name="amount_of_items" type="text" placeholder="Write amount of items" />
                            </td>
                            <td style={{ paddingLeft: "10px" }}>
                            </td>
                            <td style={{ color: "#DC143C" }}>
                                <ErrorMessage name="amount_of_items" />
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <label style={{ paddingRight: "20px" }} htmlFor="Time">Time</label>

                            </td>

                            <td>       
                                <CalendarAndClock startDate={startDate} setStartDate={setStartDate} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button type="submit">Calculate delivery price</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Form>
        </Formik>
    )


}


const InputFormAndResult = () => {
    const [calculatedDeliveryFee, setCalculatedDeliveryFee] = useState<number | null>(null)
    const [startDate, setStartDate] = useState(new Date())



    const onSubmit = (values: any) => {
        console.log("values", values)
        let cartValue: number = parseFloat(values.cartValue)
        let deliveryDistance: number = parseFloat(values.delivery_distance_in_meters)
        let numberOfItems: number = parseFloat(values.amount_of_items)
        console.log(startDate)
        setCalculatedDeliveryFee(calculateTheWholeDeliveryFee(cartValue, deliveryDistance, numberOfItems, startDate))

    }

    return (

        <div>
            <InputForm onSubmit={onSubmit} startDate={startDate} setStartDate={setStartDate} />
            <DeliveryFeeResult deliveryFee={calculatedDeliveryFee} />
        </div >

    )

}
export { DeliveryFeeResult, InputFormAndResult, InputForm }
