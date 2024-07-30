export default function validationRules(v) {
  return {
    required: !!v || 'Field is required',
    email:
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) || 'Enter a valid email address',
    password:
      v === '' ||
      /^(?=.*\d)(?=.*[!@#$%^&*\[\]\(\)])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v) ||
      'Enter valid password'
  }
}
