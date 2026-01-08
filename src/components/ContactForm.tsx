import React, { useState, useRef, useEffect } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Using Formspree - replace YOUR_FORM_ID with your actual Formspree form ID
      const response = await fetch("https://formspree.io/f/xpwzvgew", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`w-full max-w-md mx-auto space-y-5 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      noValidate
    >
      {/* Name Field */}
      <div className="relative">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="YOUR NAME"
          className={`w-full px-4 py-3 bg-black/60 border-2 ${
            errors.name ? "border-red-500" : "border-white/30"
          } text-white font-bebas text-lg tracking-wider placeholder-white/50 focus:outline-none focus:border-red-500 transition-colors duration-300`}
          aria-label="Your name"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <span className="absolute -bottom-5 left-0 text-red-400 text-sm font-bebas">
            {errors.name}
          </span>
        )}
      </div>

      {/* Email Field */}
      <div className="relative mt-6">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="YOUR EMAIL"
          className={`w-full px-4 py-3 bg-black/60 border-2 ${
            errors.email ? "border-red-500" : "border-white/30"
          } text-white font-bebas text-lg tracking-wider placeholder-white/50 focus:outline-none focus:border-red-500 transition-colors duration-300`}
          aria-label="Your email address"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <span className="absolute -bottom-5 left-0 text-red-400 text-sm font-bebas">
            {errors.email}
          </span>
        )}
      </div>

      {/* Message Field */}
      <div className="relative mt-6">
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="TELL ME ABOUT YOUR PROJECT..."
          rows={4}
          className={`w-full px-4 py-3 bg-black/60 border-2 ${
            errors.message ? "border-red-500" : "border-white/30"
          } text-white font-bebas text-lg tracking-wider placeholder-white/50 focus:outline-none focus:border-red-500 transition-colors duration-300 resize-none`}
          aria-label="Your message"
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <span className="absolute -bottom-5 left-0 text-red-400 text-sm font-bebas">
            {errors.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full mt-6 px-6 py-4 font-bebas text-xl tracking-wider transition-all duration-300 ${
          isSubmitting
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-600/30"
        } text-white`}
        aria-label="Send message"
      >
        {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
      </button>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="text-center py-3 bg-green-600/20 border border-green-500 text-green-400 font-bebas text-lg tracking-wider animate-fadeIn">
          MESSAGE SENT! I'LL BE IN TOUCH SOON.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="text-center py-3 bg-red-600/20 border border-red-500 text-red-400 font-bebas text-lg tracking-wider animate-fadeIn">
          OOPS! SOMETHING WENT WRONG. TRY AGAIN OR EMAIL ME DIRECTLY.
        </div>
      )}
    </form>
  );
};

export default ContactForm;
