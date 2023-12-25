import Stripe from 'stripe';
import config from '../../../config/config.js';

export default class PaymentServices{

    constructor(){
        this.stripe = new Stripe(config.stripeSecretKey)
    }

    createPaymentMethod =async()=>{
        const paymentMethod=  await this.stripe.paymentMethods.create({
            type: 'card',
            card: {
              token: 'tok_visa', // Utiliza el token simulado de prueba
            },
          })

          return paymentMethod;

    } 

    createPaymentIntent = async (data) => {
        try {
            const paymentIntent = await this.stripe.paymentIntents.create({
                ...data,
                confirm: true,
                return_url:'http://localhost:9090/paymentOk'
            });
            console.log(paymentIntent);
            return paymentIntent;
        } catch (error) {
            console.error('Error al crear el intento de pago:', error);
            throw error;
        }
    }
    
}