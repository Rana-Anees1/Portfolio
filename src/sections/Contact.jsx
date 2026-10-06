import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { LuCheck, LuCopy, LuMail, LuSend } from 'react-icons/lu';
import { profile } from '../data/profile';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal, Stagger, RevealItem } from '../components/Reveal';
import { easeIOS } from '../components/motion';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad">
      <div className="shell">
        <SectionHeading
          id="contact-title"
          title="Let's work together"
          description="I'm open to new MERN stack and software engineering roles, and happy to talk about web projects. Email is the quickest way to reach me."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Stagger as="ul" className="flex flex-col gap-4">
            <RevealItem as="li">
              <EmailCard />
            </RevealItem>
            <RevealItem as="li">
              <ContactLink href={profile.socials.linkedin} icon={FaLinkedin} label="LinkedIn" value="Connect with me" />
            </RevealItem>
            <RevealItem as="li">
              <ContactLink href={profile.socials.github} icon={FaGithub} label="GitHub" value="See my code" />
            </RevealItem>
          </Stagger>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function EmailCard() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <div className="glass flex items-center gap-4 rounded-[24px] p-4 sm:p-5">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-iris/15 text-iris-soft">
        <LuMail aria-hidden="true" className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-mist">Email</p>
        <a href={`mailto:${profile.email}`} className="block truncate font-medium text-ink hover:text-iris-soft">
          {profile.email}
        </a>
      </div>
      <button
        type="button"
        onClick={copyEmail}
        className="relative grid size-11 shrink-0 place-items-center rounded-full bg-fg/[0.06] text-mist transition-colors hover:bg-fg/10 hover:text-ink"
        aria-label={copied ? 'Email address copied' : 'Copy email address'}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? 'done' : 'copy'}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
          >
            {copied ? <LuCheck aria-hidden="true" className="size-4 text-mint" /> : <LuCopy aria-hidden="true" className="size-4" />}
          </motion.span>
        </AnimatePresence>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </div>
  );
}

function ContactLink({ href, icon: Icon, label, value }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ x: 4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className="glass flex items-center gap-4 rounded-[24px] p-4 transition-colors hover:border-fg/20 sm:p-5"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-fg/[0.06] text-ink">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <span className="flex-1">
        <span className="block text-sm text-mist">{label}</span>
        <span className="block font-medium text-ink">{value}</span>
      </span>
      <span className="sr-only">(opens in a new tab)</span>
    </motion.a>
  );
}

/**
 * Contact form UI.
 * There is no backend: on submit it opens the visitor's email app with the message
 * pre-filled (mailto). To send directly from the site, replace `sendMessage` with a call
 * to a service such as Formspree, EmailJS or a serverless function (see README).
 */
function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  function update(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
    if (status !== 'idle') setStatus('idle');
  }

  function validate() {
    const next = {};
    if (!values.name.trim()) next.name = 'Enter your name.';
    if (!EMAIL_PATTERN.test(values.email.trim())) next.email = 'Enter a valid email address, like name@example.com.';
    if (values.message.trim().length < 10) next.message = 'Write a message of at least 10 characters.';
    return next;
  }

  function sendMessage({ name, email, message }) {
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    sendMessage(values);
    setStatus('opened');
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="glass rounded-[28px] p-6 sm:p-8" aria-labelledby="contact-form-title">
      <h3 id="contact-form-title" className="text-xl font-semibold">
        Send a message
      </h3>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" value={values.name} error={errors.name} onChange={update} />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          error={errors.email}
          onChange={update}
        />
        <Field
          label="Message"
          name="message"
          multiline
          value={values.message}
          error={errors.message}
          onChange={update}
          className="sm:col-span-2"
        />
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-6 font-medium text-night shadow-[0_10px_30px_-12px_rgb(201_184_255/0.7)]"
        >
          <LuSend aria-hidden="true" className="size-4" />
          Send message
        </motion.button>
        <p className="text-sm text-mist">Opens your email app with the message ready to send.</p>
      </div>

      <div aria-live="polite">
        <AnimatePresence>
          {status === 'opened' && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: easeIOS }}
              className="mt-5 flex items-start gap-2 rounded-2xl bg-mint/10 px-4 py-3 text-sm text-mint"
            >
              <LuCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              Your email app should now be open with the message filled in. If nothing opened, email me at {profile.email}.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Field({ label, name, type = 'text', multiline = false, error, className = '', ...rest }) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const inputClasses = `w-full rounded-2xl border bg-fg/[0.04] px-4 py-3 text-ink placeholder:text-mist/60 transition-[border-color,background-color,box-shadow] duration-300 focus:bg-fg/[0.07] focus:outline-none focus:ring-4 focus:ring-iris/20 ${
    error ? 'border-danger/70 focus:border-danger' : 'border-fg/10 hover:border-fg/20 focus:border-iris'
  }`;
  const shared = {
    id,
    name,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: inputClasses,
    ...rest,
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink/90">
        {label}
      </label>
      {multiline ? <textarea rows={5} {...shared} className={`${inputClasses} resize-y`} /> : <input type={type} {...shared} />}
      {error && (
        <p id={errorId} className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
