import React, { useState } from 'react';
import Button from './button';
import { api } from '~/trpc/react'; // Import trpc client setup for API access

const ContactSection: React.FC = () => {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  // Mutation for creating a contact
  const { mutateAsync: createContact } = api.contacts.createContact.useMutation();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Call the createContact mutation
      await createContact({ name, email, phone, message });

      // Reset form fields on success
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      alert('Message sent successfully!');
    } catch (error) {
      alert('There was an error sending your message. Please try again.');
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col items-start mt-16 text-cyan-100 max-md:mt-10 px-8 py-12">
      <h2 className="text-7xl font-semibold max-md:max-w-full max-md:text-5xl imagination-text">Let&apos;s Connect</h2>
      <div className="flex flex-wrap gap-6 mt-16 max-md:mt-10 text-2xl">
        <div className="text-6xl text-cyan-300 max-md:text-4xl">*</div>
        <p className="flex-auto self-start mt-3 text-3xl max-md:max-w-full">
          Whether you have a question, or want to discuss a potential project, <br />
          our team at AIXOR is here to help. Please fill out the form below!!!
        </p>
      </div>

      {/* Larger form section */}
      <form onSubmit={handleSubmit} className="w-full mt-24 mid-md:mt-10">
        {/* Name Field */}
        <div className="w-full max-w-[1000px]">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Name"
            className="w-full px-8 py-5 text-2xl rounded-xl border border-solid border-stone-500 text-white text-opacity-100"
            required
          />
        </div>

        {/* Email and Phone Fields */}
        <div className="mt-12 w-full max-w-[1000px]">
          <div className="flex gap-8 max-md:flex-col">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-w-[450px]">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="E-Mail"
                className="grow gap-2.5 self-stretch px-8 py-5 text-2xl rounded-xl border border-solid border-stone-500 text-white text-opacity-100 max-md:mt-8"
                required
              />
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-w-[500px]">
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-label="Phone"
                className="grow gap-2.5 self-stretch px-8 py-5 text-2xl rounded-xl border border-solid border-stone-500 text-white text-opacity-100 max-md:mt-8"
              />
            </div>
          </div>
        </div>

        {/* Message Field */}
        <div className="w-full max-w-[1000px] mt-12">
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-label="Message"
            className="w-full px-8 pt-8 pb-32 text-2xl rounded-xl border border-solid border-stone-500 text-white text-opacity-100"
            required
          ></textarea>
        </div>
        
        <div className="mt-16">
          <Button label="Send Message" />
        </div>
      </form>
    </section>
  );
};

export default ContactSection;
