# userProfile.ts (Repository)

1. What does this repository do?
A: This repository contains functions for getting all user data, updating user, and deleting user. The functions are: getUsers which simply returns all users from our static database, getUserById which is used to find a specific user, createUser which is used to create a new user, updateUser which is used to update a specific user, and deleteUser which is used to delete a specific user.


2. How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns?
A: I think I only needed getUsers, updateUser, and deleteUser for now but I included the other two to prepare for the next two modules, where we can add a real database and roles like admin and user.

3. Where is this implementation made use of in the project and how?
A: I have only been able to implement getUsers() in my feature page profile-page.tsx to fetch all users instead of importing the user data.

# userProfileService.ts (Services)

1. What does this service do?
A: This service calls all the function from the userProfile repository. getUsers, createNewUser, updateUser, and deleteUser. It does not include any logic inside the functions except for validateUser which validates the user input if certain fields are empty and returns a list of errors.

2. How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns?
A: The only logic I included here was the validation for username and email to ensure that those fields are not empty when updating a user profile.

3. Where is this implementation made use of in the project and how?
A: I have only been able to implement validateUser() in my feature page profile-page.tsx to check if the username and email fields are empty when the user updates their profile.

# useForm.ts (useFormState from Christian, implemented in my feature page)

1. What does this hook do?
A: This custom hook can be used by any feature page that has a form. It stores the user input for updating fields, error messages for validation, and error handling for valid inputs.

2. How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns?
A: I only used four properties of this custom hook that I thought I would need in my page. The properties are formData which is used to store input from the user, handleChange which is used to set the formData using the user's input, errors which is used for storing validation errors, and setErrors which is used to update the error list.

3. Where is this implementation made use of in the project and how?
A: This is implemented in my feature page profile-page.tsx. I replaced my updateUser useState to use this custom hook instead. 