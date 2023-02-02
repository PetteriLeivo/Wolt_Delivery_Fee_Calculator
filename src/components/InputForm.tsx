import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import CalendarAndClock from './CalendarAndClock';
import { calculateTheWholeDeliveryFee } from './calculator'
import './InputFormStyle.css'



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
                    .typeError("Cart value must be a number")
                    .positive("Cart value must be greater than zero")
                    .required('Required'),
                delivery_distance_in_meters: Yup.number()
                    .typeError("Delivery distance must be a number")
                    .integer("Delivery distance must be an integer")
                    .positive("Delivery distance must be greater than zero")
                    .required('Required'),
                amount_of_items: Yup.number()
                    .typeError("Amount of items must be a number")
                    .integer("Amount of items must be an integer")
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
                                <label htmlFor="cartValue">Cart value</label>
                            </td>
                            <td>
                                <Field id="cartValue" name="cartValue" type="text" placeholder="" />
                            </td>
                            <td>
                                €
                            </td>
                            <td style={{ color: "#DC143C" }}>
                                <ErrorMessage name="cartValue" />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="delivery_distance_in_meters">Delivery distance</label>
                            </td>
                            <td>
                                <Field id="delivery_distance_in_meters" name="delivery_distance_in_meters" type="text" placeholder="" />
                            </td>
                            <td>
                                m
                            </td>

                            <td style={{ color: "#DC143C" }}>
                                <ErrorMessage name="delivery_distance_in_meters" />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="amount_of_items">Amount of items</label>
                            </td>
                            <td>
                                <Field id="amount_of_items" name="amount_of_items" type="text" placeholder="" />
                            </td>
                            <td>&nbsp;</td>
                            <td style={{ color: "#DC143C" }}>
                                <ErrorMessage name="amount_of_items" />
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="Time">Time</label>

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
        console.log(typeof values)
        console.log(values)
        console.log(typeof values.cartValue)
        console.log(typeof values.delivery_distance_in_meters)
        console.log(typeof values.amount_of_items)
        let cartValue: number = parseFloat(values.cartValue)
        let deliveryDistance: number = parseFloat(values.delivery_distance_in_meters)
        let numberOfItems: number = parseFloat(values.amount_of_items)
        setCalculatedDeliveryFee(calculateTheWholeDeliveryFee(cartValue, deliveryDistance, numberOfItems, startDate))

    }

    return (
        <div id="titleAndContent">
            <div id="titleSection">
                <h1>Delivery Fee Calculator</h1>
            </div >
            <div id="contentSection">
                <InputForm onSubmit={onSubmit} startDate={startDate} setStartDate={setStartDate} />
                <DeliveryFeeResult deliveryFee={calculatedDeliveryFee} />
            </div >
            <div id="bottom">
            </div>
        </div >


    )

}
export { DeliveryFeeResult, InputFormAndResult, InputForm }
