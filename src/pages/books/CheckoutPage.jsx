import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import Swal from 'sweetalert2';

export const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isChecked, setIsChecked] = useState(false);
  const {currentUser} = useAuth();

  const [createOrder,{isLoading,error}] = useCreateOrderMutation()
  const navigate=useNavigate()
  

  const onSubmit = async (data) => {
    const newOrder = {
      name: data.name,
      email: currentUser.email,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode
      },
      phone: data.phone,
      productIds: cartItems.map(item => item?._id),
      totalPrice: totalPrice,
    };
    
    try {
     
      await createOrder(newOrder).unwrap();
      Swal.fire({
        title: "Confirmed Order",
        text: "You order placed successfully",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's okay!"
      });

      navigate("/orders")
      
    } catch (error) {
      console.error("Error place and order", error);
      alert("Failed to place an order")
    }
  }

  if(isLoading) return <div>Loading.....</div>

  return (
    <section>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <h2 className="font-semibold text-xl text-gray-600 mb-2">Cash On Delivery</h2>
          <p className="text-gray-500 mb-2">Total Price: {totalPrice}</p>
          <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>

          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-5">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      {...register('name', { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.name && <p className="text-red-500 text-xs">This field is required</p>}
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="text"
                      value={currentUser.email}
                      disabled
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="text"
                      {...register('phone', { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.phone && <p className="text-red-500 text-xs">This field is required</p>}
                  </div>

                  <div className="md:col-span-3">
                    <label htmlFor="address">Address / Street</label>
                    <input
                      type="text"
                      {...register('address', { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.address && <p className="text-red-500 text-xs">This field is required</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      {...register('city', { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.city && <p className="text-red-500 text-xs">This field is required</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="country">Country / Region</label>
                    <input
                      type="text"
                      {...register('country', { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.country && <p className="text-red-500 text-xs">This field is required</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="state">State / Province</label>
                    <input
                      type="text"
                      {...register('state', { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.state && <p className="text-red-500 text-xs">This field is required</p>}
                  </div>

                  <div className="md:col-span-1">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input
                      type="text"
                      {...register('zipcode', { required: true })}
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                    {errors.zipcode && <p className="text-red-500 text-xs">This field is required</p>}
                  </div>

                  <div className="md:col-span-5 mt-3">
                    <div className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                        className="form-checkbox"
                      />
                      <label htmlFor="billing_same" className="ml-2">
                        I agree to the <Link to="/terms" className="underline text-blue-600">Terms & Conditions</Link> and <Link to="/policy" className="underline text-blue-600">Shopping Policy</Link>.
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-5 text-right">
                    <button
                      type="submit"
                      disabled={!isChecked}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};