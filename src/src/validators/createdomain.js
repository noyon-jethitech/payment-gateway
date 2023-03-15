function validateDomainInput(userjwtToken, domain, companyName, contactNumber,
  address, logo, description, banner, website, designation) {
  const errors = {};
  if (userjwtToken.trim() === '') {
    errors.userjwtToken = 'User token must not be empty';
  }
  if (domain.trim() === '') {
    errors.domain = 'domain must not be empty';
  }
  if (companyName.trim() === '') {
    errors.companyName = 'companyName must not be empty';
  }
  if (contactNumber.trim() === '') {
    errors.contactNumber = 'Contact number must not be empty';
  }
  if (address.trim() === '') {
    errors.address = 'address must not be empty';
  }
  if (logo.trim() === '') {
    errors.logo = 'logo must not be empty';
  }
  if (description.trim() === '') {
    errors.description = 'description must not be empty';
  }
  if (banner.trim() === '') {
    errors.banner = 'banner must not be empty';
  }
  if (website.trim() === '') {
    errors.website = 'website must not be empty';
  }
  if (designation.trim() === '') {
    errors.designation = 'designation must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
}

module.exports = validateDomainInput;
