import React, { useState } from 'react';

function JobSeekerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobCategory: 'Courier Service',
    experience: '',
    availability: '',
    profileImage: null,
    resume: null,
    coverLetter: null,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0], // We are assuming only one file is uploaded
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Profile submitted for ${formData.jobCategory} job.`);
  };

  return (
    <section className="job-seeker-form">
      <h2>Submit Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="jobCategory">Job Category</label>
          <select
            id="jobCategory"
            name="jobCategory"
            value={formData.jobCategory}
            onChange={handleChange}
            required
          >
            <option value="Courier Service">Courier Service</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Babysitting">Babysitting</option>
            <option value="Elderly Support">Elderly Support</option>
            <option value="Pet Care">Pet Care</option>
          </select>
        </div>
        <div>
          <label htmlFor="experience">Experience</label>
          <textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="availability">Availability</label>
          <input
            type="text"
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="profileImage">Profile Image</label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label htmlFor="resume">Upload Resume</label>
          <input
            type="file"
            id="resume"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label htmlFor="coverLetter">Upload Cover Letter</label>
          <input
            type="file"
            id="coverLetter"
            name="coverLetter"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}

export default JobSeekerForm;
