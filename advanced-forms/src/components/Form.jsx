import React, { useState, useEffect } from "react";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
  name: Yup.string().min(3, "Must be at least 3 characters.").required("Must include a name."),
  email: Yup.string()
    .email("Must be a valid email address.")
    .required("Must include email address.")
    .notOneOf(["waffle@syrup.com"], "That email is already taken."),
  password: Yup.string().min(6, "Passwords must be at least 6 characters long.").required("Password is Required"),
  role: Yup.string()
    .required("Role is required")
    .oneOf(
      ["Front End Developer", "Back End Developer", "Full Stack Developer"],
      "Role can only be: Front End Developer, Back End Developer, or Full Stack Developer."
    ),
  startDate: Yup.date().required("You must provide a start date."),
  endDate: Yup.date().required("You must provide a end date."),
  reason: Yup.string().required("A reason must be provided"),
  tos: Yup.boolean().oneOf([true], "You must accept Terms and Conditions"),
});

const Form = ({ submitForm }) => {
  const defaultFormState = {
    name: "",
    email: "",
    password: "",
    role: "",
    startDate: "",
    endDate: "",
    reason: "",
    tos: false,
  };
  const [formData, setFormData] = useState({ ...defaultFormState });

  const [errors, setErrors] = useState({ ...defaultFormState, tos: "" });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const inputChange = (e) => {
    e.persist();

    let valueToTest = e.target.value;

    if (e.target.type === "checkbox")
      if (e.target.value === "on") valueToTest = true;
      else valueToTest = false;

    Yup.reach(formSchema, e.target.name)
      .validate(valueToTest)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });

    if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.name]: !formData[e.target.name] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(formData);
    setFormData({ ...defaultFormState });
  };

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formData]);

  return (
    <div className="adv-form">
      <h4>Form</h4>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} placeholder="Name" onChange={inputChange} />
        <span className="error">{errors.name}</span>
        <input name="email" value={formData.email} type="email" placeholder="Email" onChange={inputChange} />
        <span className="error">{errors.email}</span>
        <input
          name="password"
          value={formData.password}
          type="password"
          placeholder="Password"
          onChange={inputChange}
        />
        <span className="error">{errors.password}</span>
        <select name="role" onChange={inputChange}>
          <option value="">ROLE</option>
          <option value="Front End Developer">Front End Developer</option>
          <option value="Back End Developer">Back End Developer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
        </select>
        <span className="error">{errors.role}</span>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input name="startDate" value={formData.startDate} type="date" onChange={inputChange} />
          <span className="error">{errors.startDate}</span>
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input name="endDate" value={formData.endDate} type="date" onChange={inputChange} />
          <span className="error">{errors.endDate}</span>
        </div>
        <input name="reason" value={formData.reason} placeholder="Reason for Joining" onChange={inputChange} />
        <span className="error">{errors.reason}</span>
        <div className="tos">
          <label htmlFor="tos">Terms of Service</label>
          <input name="tos" type="checkbox" onChange={inputChange} checked={formData.tos} />
          <span className="error">{errors.tos}</span>
        </div>
        <input type="submit" value="Submit" disabled={buttonDisabled} />
      </form>
    </div>
  );
};

export default Form;
