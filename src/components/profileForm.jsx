import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import "../App.css";
import "../index.css";

function ProfileForm({
  formData,
  handleChange,
  handleSubmit,
  cityOptions,
  helperOptions,
  handleImageUpload,
  uploadedImages,
  removeImage,
}) {
  // Convert cityOptions to react-select-compatible options
  const citySelectOptions = cityOptions.map((city) => ({ value: city, label: city }));

  // Convert helperOptions to react-select-compatible options
  const helperSelectOptions = helperOptions.map((helper) => ({
    value: helper,
    label: helper,
  }));

  const handleLocationChange = (selectedOption) => {
    handleChange({ target: { name: "location", value: selectedOption?.value || "" } });
  };

  const handleHelperTypeChange = (selectedOption) => {
    handleChange({ target: { name: "helperType", value: selectedOption?.value || "" } });
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled
        />
      </div>
      <div className="form-group">
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Location:</label>
        <Select
          options={citySelectOptions}
          value={citySelectOptions.find((option) => option.value === formData.location)}
          onChange={handleLocationChange}
          placeholder="Select location"
          isClearable
          required
        />
      </div>
      <div className="form-group">
        <label>Helper Type:</label>
        <Select
          options={helperSelectOptions}
          value={helperSelectOptions.find((option) => option.value === formData.helperType)}
          onChange={handleHelperTypeChange}
          placeholder="Select helper type"
          isClearable
          required
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <>Add detailed description of the service you provide</>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add details about your service"
          rows="6"
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label>Upload Images:</label>
        <>Add multiple image of your vehicle if you provide service with "Van" / "Car with Tow Bar".
        If you select "Person" add your profile picture.</>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          required
        />
        <div className="image-preview-container">
          {uploadedImages.map((image, index) => (
            <div key={index} className="image-preview">
              <img src={URL.createObjectURL(image)} alt={`Upload preview ${index + 1}`} />
              <button type="button" onClick={() => removeImage(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
}

ProfileForm.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
    location: PropTypes.string.isRequired,
    helperType: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  cityOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  helperOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleImageUpload: PropTypes.func.isRequired,
  uploadedImages: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeImage: PropTypes.func.isRequired,
};

export default ProfileForm;
