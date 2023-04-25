import React from 'react'
import { useLocation } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from '../Page/Payment';
import { OrderSummary } from '../Page/Order';

const Payment = () => {

 const {
     state: { apiResult, userInput }
 } = useLocation();

 
   

    const stripePromise = loadStripe("pk_test_51MvG67GTzL3H0LT5dx150qu8gz2Tbg5KA4unDvISuytSslpyTdMlriKlnYelAhJyoTSgyfwACsLu7RMF5vc7Xp1N00UOS4NYef");
    const options = {
        // passing the client secret obtained from the server
        clientSecret: apiResult.clientSecret,
    };

  return (
      <Elements stripe={stripePromise} options={options}>
        <div className='container m-5 p-5'>
            <div className="row">
                <div className="col-md-7"><OrderSummary  data={apiResult} userInput={userInput}/></div>
                <div className="col-md-4 offset-md-1">
                      <h3 style={{ color:"#FFBF00"}}>Payment</h3>
                    <div className='mt-5'>
                          <PaymentForm data={apiResult} userInput={userInput}/>
                    </div>
                      
                </div>
            </div>
        </div>
          
      </Elements>
  )
}

export default Payment