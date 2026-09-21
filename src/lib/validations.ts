export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone);
}

export interface ValidationErrors {
  [key: string]: string;
}

export function validateCheckoutForm(data: {
  email: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.email || !validateEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.firstName.trim()) {
    errors.firstName = "First name is required.";
  }
  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required.";
  }
  if (!data.street.trim()) {
    errors.street = "Delivery street address is required.";
  }
  if (!data.city.trim()) {
    errors.city = "City is required.";
  }
  if (!data.province.trim()) {
    errors.province = "State or Province is required.";
  }
  if (!data.postalCode.trim()) {
    errors.postalCode = "Postal code is required.";
  }

  return errors;
}

export function validateContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.name.trim()) errors.name = "Your name is required.";
  if (!data.email || !validateEmail(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.subject.trim()) errors.subject = "Subject is required.";
  if (!data.message.trim() || data.message.length < 10) {
    errors.message = "Please include a detailed message (minimum 10 characters).";
  }

  return errors;
}
