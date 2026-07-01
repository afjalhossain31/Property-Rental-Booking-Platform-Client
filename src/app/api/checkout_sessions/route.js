import { NextResponse } from 'next/server';
import { stripe } from '../../../lib/stripe'; // আপনার তৈরি করা ফাইল থেকে ইমপোর্ট

export async function POST(req) {
  try {
    const body = await req.json();
    const { property, user } = body;

    const origin = req.headers.get('origin') || 'http://localhost:3000';
    
    const priceAmount = Number(property.price) || 0;

    // Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd', 
            product_data: {
              name: property.title || 'Property Booking',
              images: property.image ? [property.image] : [], 
            },
            unit_amount: Math.round(priceAmount * 100), 
          },
          quantity: 1,
        },
      ],
      mode: 'payment', 
      
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}&propertyId=${property._id}&amount=${priceAmount}&ownerEmail=${property.ownerEmail}&tenantEmail=${user.email}&propertyName=${encodeURIComponent(property.title || 'Property')}`,
      
      cancel_url: `${origin}/properties/${property._id}`,
    });

    // ফ্রন্টএন্ডে URL রিটার্ন করা
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Error: ", err); // এরর দেখার জন্য
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}