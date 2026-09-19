"use client";

import {FormEvent, useState} from "react";
import {ArrowLeft, CheckCircle2, MapPin, ShieldCheck, Wrench} from "lucide-react";
import Link from "next/link";

const specialties = [
  "Engine & diagnostics",
  "Electrical systems",
  "Brakes & suspension",
  "Tyres & punctures",
  "Battery & starting",
  "Cooling & overheating",
  "Transmission",
  "AC & climate",
  "Bodywork",
  "Vehicle recovery",
];

export default function MechanicRegister() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function toggleSpecialty(item: string) {
    setSelected((current) =>
      current.includes(item) ? current.filter((x) => x !== item) : [...current, item]
    );
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="auth-page">
        <div className="auth-card success-card">
          <div className="success-icon"><CheckCircle2 size={32} /></div>
          <div className="eyebrow">APPLICATION RECEIVED</div>
          <h1>Your mechanic profile is ready for verification.</h1>
          <p>
            We have captured your account details and service specifications.
            Verification can be completed before you start receiving driver jobs.
          </p>
          <div className="success-list">
            <span><CheckCircle2 size={17}/> Profile information</span>
            <span><CheckCircle2 size={17}/> Skills and specialties</span>
            <span><CheckCircle2 size={17}/> Service area and availability</span>
          </div>
          <Link className="primary wide" href="/">Back to Mechanics</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-wrap">
        <Link className="backlink" href="/"><ArrowLeft size={17}/> Back to Mechanics</Link>
        <div className="auth-heading">
          <div className="brand"><span className="mark"><Wrench size={20}/></span><b>MECHANICS</b></div>
          <div className="eyebrow">MECHANIC NETWORK</div>
          <h1>Create your mechanic account</h1>
          <p>Tell drivers what you do, where you work and when you are available.</p>
        </div>

        <form className="auth-card form-card" onSubmit={submit}>
          <section className="form-section">
            <div className="form-title"><span>01</span><div><h2>Account details</h2><p>Basic information drivers and our team can use to identify you.</p></div></div>
            <div className="form-grid">
              <label>Full name<input required name="name" placeholder="e.g. John Otieno" /></label>
              <label>Phone number<input required name="phone" type="tel" placeholder="+254 7XX XXX XXX" /></label>
              <label>Email address<input required name="email" type="email" placeholder="you@example.com" /></label>
              <label>Create password<input required name="password" type="password" minLength={8} placeholder="At least 8 characters" /></label>
            </div>
          </section>

          <section className="form-section">
            <div className="form-title"><span>02</span><div><h2>Professional profile</h2><p>Your public mechanic profile and experience.</p></div></div>
            <div className="form-grid">
              <label>Business / workshop name<input name="business" placeholder="e.g. Otieno Auto Care" /></label>
              <label>Years of experience<select name="experience" defaultValue=""><option value="" disabled>Select experience</option><option>Less than 1 year</option><option>1–3 years</option><option>4–7 years</option><option>8–15 years</option><option>15+ years</option></select></label>
              <label>Primary service location<input required name="location" placeholder="Town / estate / area" /></label>
              <label>Service radius<select name="radius" defaultValue="10"><option value="5">Up to 5 km</option><option value="10">Up to 10 km</option><option value="20">Up to 20 km</option><option value="40">Up to 40 km</option><option value="60">60+ km</option></select></label>
            </div>
            <button type="button" className="location-button"><MapPin size={17}/> Use my current location</button>
          </section>

          <section className="form-section">
            <div className="form-title"><span>03</span><div><h2>Specialties</h2><p>Select every type of work you are qualified to handle.</p></div></div>
            <div className="specialty-grid">
              {specialties.map((item) => (
                <button type="button" key={item} className={selected.includes(item) ? "specialty selected" : "specialty"} onClick={() => toggleSpecialty(item)}>
                  {selected.includes(item) && <CheckCircle2 size={16}/>}
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className="form-section">
            <div className="form-title"><span>04</span><div><h2>Services & availability</h2><p>Help us match you with the right jobs.</p></div></div>
            <div className="form-grid">
              <label>Service type<select name="serviceType" defaultValue="mobile"><option value="mobile">Mobile / roadside</option><option value="workshop">Workshop only</option><option value="both">Mobile + workshop</option></select></label>
              <label>Availability<select name="availability" defaultValue="day"><option value="day">Daytime</option><option value="evening">Evenings</option><option value="24-7">24/7</option><option value="custom">Custom schedule</option></select></label>
              <label>Starting call-out fee (KSh)<input name="fee" type="number" min="0" placeholder="e.g. 500" /></label>
              <label>Vehicle types<select name="vehicleTypes" defaultValue="all"><option value="all">All vehicles</option><option>Cars</option><option>Motorcycles</option><option>Light commercial</option><option>Heavy vehicles</option></select></label>
            </div>
            <label className="full">About your services<textarea name="bio" rows={4} placeholder="Describe your experience, equipment and the services you provide." /></label>
          </section>

          <section className="verification-note">
            <ShieldCheck size={21}/>
            <div><b>Verification</b><p>Before receiving jobs, the platform can collect your ID, business details, qualifications and other verification documents.</p></div>
          </section>

          <button className="primary wide" type="submit">Create mechanic account</button>
          <p className="form-foot">By creating an account, you agree to the Mechanics platform terms and verification process.</p>
        </form>
      </div>
    </main>
  );
}
