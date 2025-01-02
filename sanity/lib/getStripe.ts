import { loadStripe } from '@stripe/stripe-js';

let stripePromise: any;

const getStripe = () => {
    if (!stripePromise) {
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        throw new Error('Stripe publishable key is not set in environment variables');
      }
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    }
  
    return stripePromise;
  };
export default getStripe  