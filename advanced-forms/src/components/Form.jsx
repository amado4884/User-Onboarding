import React, { useState, useEffect } from "react";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
  name: Yup.string().min(3, "Must be at least 3 characters.").required("Must include a name."),
  email: Yup.string().email("Must be a valid email address.").required("Must include email address."),
  password: Yup.string().min(6, "Passwords must be at least 6 characters long.").required("Password is Required"),
  tos: Yup.boolean().oneOf([true], "You must accept Terms and Conditions"),
});

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    tos: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    tos: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const inputChange = (e) => {
    e.persist();

    let valueToTest = false;

    if (e.target.type === "checkbox")
      if (e.target.value === "on") valueToTest = true;
      else valueToTest = false;
    else valueToTest = e.target.value;

    // const checkbox = e.target.type === "checkbox" && e.target.value === "on" ? true : false;
    // const valueToTest = e.target.type === "checkbox" ? checkbox : e.target.value;

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
    console.log(formData);
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
        <div className="tos">
          <label htmlFor="tos">Terms of Service</label>
          <input name="tos" type="checkbox" onChange={inputChange} />
          <span className="error">{errors.tos}</span>
        </div>
        <input type="submit" value="Submit" disabled={buttonDisabled} />
      </form>
    </div>
  );
};

export default Form;
