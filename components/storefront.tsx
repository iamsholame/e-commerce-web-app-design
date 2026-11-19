'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { ArrowRight, Check, LockKeyhole, Menu, ShieldCheck, Truck } from 'lucide-react'
import { startCheckoutSession } from '@/app/actions/stripe'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function CheckoutPanel({ started }: { started: boolean }) {
  const fetchClientSecret = useCallback(() => startCheckoutSession('aurora-headphones'), [])

  if (started) {
    return (
      <div className="checkout-frame" aria-label="Secure payment form">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    )
  }

  return (
    <div className="checkout-ready">
      <div className="checkout-row"><span>Aurora Headphones</span><strong>$189.00</strong></div>
      <div className="checkout-row muted"><span>Shipping</span><span>Complimentary</span></div>
      <div className="checkout-total"><span>Total</span><strong>$189.00 <small>USD</small></strong></div>
      <p className="secure-note"><LockKeyhole aria-hidden="true" /> Secure checkout powered by Stripe</p>
    </div>
  )
}

export default function Storefront() {
  const [checkoutStarted, setCheckoutStarted] = useState(false)

  return (
    <main className="store-shell">
      <header className="topbar">
        <a href="#home" className="wordmark" aria-label="Forma home"><span className="brand-mark">f</span>forma<span className="wordmark-period">.</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#product">The headphones</a>
          <a href="#details">Our approach</a>
        </nav>
        <a className="header-cart" href="#checkout">Your order <span>01</span><ArrowRight aria-hidden="true" /></a>
        <button className="mobile-menu" type="button" aria-label="Open menu"><Menu aria-hidden="true" /></button>
      </header>

      <section className="content-grid" id="home">
        <div className="product-side" id="product">
          <div className="eyebrow"><span className="eyebrow-dot" /> SOUND, REFINED</div>
          <h1>Less noise.<br /><em>More you.</em></h1>
          <p className="intro">A quieter kind of listening. Thoughtfully crafted headphones for wherever your day takes you.</p>

          <div className="product-visual">
            <div className="image-wash" />
            <Image src="/product-aurora-headphones.png" alt="Aurora over-ear headphones in ivory and champagne metal" fill priority sizes="(max-width: 720px) 100vw, 55vw" className="product-image" />
            <div className="image-caption"><span>01 / 03</span><span>THE AURORA COLLECTION</span></div>
            <div className="swatch-dot" aria-label="Ivory color" />
          </div>

          <div className="product-meta" id="details">
            <div>
              <div className="product-title-row"><h2>Aurora Headphones</h2><span className="price">$189</span></div>
              <p className="product-description">A considered balance of clarity, comfort, and calm. Up to 40 hours of beautifully uninterrupted sound.</p>
            </div>
            <div className="perks">
              <span><Truck aria-hidden="true" /> Free shipping</span>
              <span><ShieldCheck aria-hidden="true" /> 30-day returns</span>
            </div>
          </div>
        </div>

        <aside className="checkout-side" id="checkout" aria-labelledby="checkout-heading">
          <div className="checkout-card">
            <div className="card-heading">
              <div><span className="step-label">YOUR NEXT FAVORITE</span><h2 id="checkout-heading">Make it yours.</h2></div>
              <span className="secure-badge"><LockKeyhole aria-hidden="true" /> Secure</span>
            </div>
            <div className="mini-product">
              <div className="mini-thumb"><Image src="/product-aurora-headphones.png" alt="" fill sizes="64px" /></div>
              <div className="mini-info"><strong>Aurora Headphones</strong><span>Ivory · Wireless</span></div>
              <strong className="mini-price">$189.00</strong>
            </div>
            <div className="checkout-rule" />
            <CheckoutPanel started={checkoutStarted} />
            {!checkoutStarted && (
              <button className="buy-button" type="button" onClick={() => setCheckoutStarted(true)}>
                Buy now <ArrowRight aria-hidden="true" />
              </button>
            )}
            <p className="payment-caption"><Check aria-hidden="true" /> No hidden fees. Pay securely with card.</p>
            <div className="trust-row"><span>VISA</span><span>mastercard</span><span>AMEX</span><span>Apple Pay</span></div>
          </div>
          <p className="support-note">A little question? <a href="mailto:hello@forma.example">We&apos;re here to help.</a></p>
        </aside>
      </section>

      <footer className="page-footer"><span>© 2026 FORMA AUDIO</span><span>MADE FOR THE MOMENTS IN BETWEEN</span><span>DESIGNED WITH INTENTION</span></footer>
    </main>
  )
}
