import { expect, test, jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import { DeliveryFeeResult, InputFormAndResult, InputForm } from './InputForm'
import userEvent from '@testing-library/user-event'




test('renders delivery fee', () => {
  const deliveryFee: number = 66
  render(<DeliveryFeeResult deliveryFee={deliveryFee} />)
  const element = screen.getByText('Delivery fee is: ' + deliveryFee)
  expect(element).toBeDefined()
})

test('renders InputFormAndResult component', () => {
  render(<InputFormAndResult />)
  const element = screen.getByText('Cart value')
  expect(element).toBeDefined()
})


test('rendering and submitting InputForm', async () => {
  const onSubmit = jest.fn()
  const setStartDate = jest.fn()
  render(<InputForm onSubmit={onSubmit} startDate={new Date('Jan 27 2023 17:00:00 GMT+0000')} setStartDate={setStartDate} />)
  screen.debug();
  const user = userEvent.setup()

  await user.type(screen.getByLabelText(/cart value/i), '1')
  await user.type(screen.getByLabelText(/Delivery distance/i), '1')
  await user.type(screen.getByLabelText(/Amount of items/i), '1')


  await user.click(screen.getByRole('button', { name: /Calculate delivery price/i}))


  expect(onSubmit).toHaveBeenCalledTimes(1)

  const test = onSubmit.mock.calls[0][0]

  expect(test).toMatchObject({
    cartValue: "1",
    delivery_distance_in_meters: "1",
    amount_of_items: "1",
  })
}
)
