"use client";

import {FormEvent, useState} from "react";
import {ArrowLeft, CheckCircle2, Star, Wrench} from "lucide-react";
import Link from "next/link";

const jobTypes = ["Engine & diagnostics","Flat tyre / tyre repair","Battery / starting","Brakes & suspension","Electrical fault","Overheating / cooling","Transmission","AC & climate","Recovery / towing","General service"];

export default function RateMechanic() {
  const [rating, setRating] = useState(0);
  const [job, setJob] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!rating || !job) return;
    setSubmitted(true);
  }

  if (submitted) return (
    <main className="auth-page">
      <div className="auth-card success-card">
        <div className="success-icon"><CheckCircle2 size={32}/></div>
        <div className="eyebrow">REVIEW SUBMITTED</div>
        <h1>Thanks for rating your mechanic.</h1>
        <p>Your rating will be attached to the completed job and will help future customers understand this mechanic's work.</p>
        <Link className="primary wide" href="/">Back to Mechanics</Link>
      </div>
    </main>
  );

  return (
    <main className="auth-page">
      <div className="auth-wrap narrow">
        <Link className="backlink" href="/"><ArrowLeft size={17}/> Back to Mechanics</Link>
        <div className="auth-heading">
          <div className="brand"><span className="mark"><Wrench size={20}/></span><b>MECHANICS</b></div>
          <div className="eyebrow">COMPLETED JOB</div>
          <h1>Rate your mechanic</h1>
          <p>Reviews are linked to the specific job completed, so customers can rate the actual service they received.</p>
        </div>

        <form className="auth-card form-card" onSubmit={submit}>
          <div className="review-mechanic">
            <div className="review-avatar"><Wrench size={22}/></div>
            <div><b>Mechanic name</b><span>Verified mechanic · Job #000123</span></div>
          </div>

          <section className="form-section">
            <div className="form-title"><span>01</span><div><h2>What job was done?</h2><p>Select the service you received.</p></div></div>
            <div className="specialty-grid">
              {jobTypes.map(item => <button type="button" key={item} className={job===item ? "specialty selected" : "specialty"} onClick={()=>setJob(item)}>{job===item && <CheckCircle2 size={16}/>} {item}</button>)}
            </div>
          </section>

          <section className="form-section rating-section">
            <div className="form-title"><span>02</span><div><h2>How was the work?</h2><p>Give a rating from 1 to 5 stars.</p></div></div>
            <div className="stars" role="radiogroup" aria-label="Mechanic rating">
              {[1,2,3,4,5].map(value => <button type="button" key={value} className={value<=rating ? "star active" : "star"} aria-label={value+" stars"} onClick={()=>setRating(value)}><Star fill={value<=rating ? "currentColor" : "none"} size={31}/></button>)}
            </div>
            <div className="rating-label">{rating ? rating + " out of 5" : "Select a rating"}</div>
          </section>

          <section className="form-section">
            <div className="form-title"><span>03</span><div><h2>Tell other customers about the job</h2><p>Optional feedback about the mechanic's work.</p></div></div>
            <label className="full"><span>Review</span><textarea name="review" rows={5} placeholder="Was the mechanic professional? Was the repair completed well? How was the response time?" /></label>
          </section>

          <label className="recommend"><input type="checkbox" name="recommend"/><span>I'd recommend this mechanic to other customers.</span></label>
          <button className="primary wide" type="submit" disabled={!rating || !job}>Submit job rating</button>
        </form>
      </div>
    </main>
  );
}
