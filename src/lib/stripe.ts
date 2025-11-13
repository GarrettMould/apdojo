import { loadStripe } from '@stripe/stripe-js';

// This file is intended for components that use Stripe.js on the client side.
// To avoid loading Stripe globally, initialize it within the components that need it.

// Example of how to use it in a component:
//
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
//
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
//
// const MyCheckoutComponent = () => (
//   <Elements stripe={stripePromise} options={...}>
//     <PaymentForm />
//   </Elements>
// );

export { loadStripe }; 