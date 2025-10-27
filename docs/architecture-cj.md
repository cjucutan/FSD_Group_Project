# useFormState Hook (useForm.ts)

1. What does this Hook do?

   - This hook basically helps manage any forms that we have in our game library app. It keeps track of what the user types, stores any error messages, as well as lets us clear any of the errors and reset the form to empty inputs

2. How did you decide what logic to include in that implementation, and how does it separate solution concerns?

   - This hook includes the tools that every form can use and is not specific to one hook
   - For example:
     - Storing what the user types
     - Keeping track of errors
     - Clearing Errors
     - Resetting the form
   - What I left out was logic that was specific to each form such as my things specific to my discussion form. This hook only cares about handling the basic form tools that all of our forms need.

3. Where is this implementation used and how?
   - This hook is implemented in the useDiscussionForm.ts, and what it does is:
     - Clear errors
     - Store errors from validation
     - Show the errors in the UI
     - Clear everything when the form is submitted

# useDiscussionForm Hook

1. What does this Hook do?

   - This hook handles everything that is needed to create a discussion post
   - It tracks what the user types, checks if everything is filled out correctly, submits the form, shows the toastify success message, and persists the post into the list of posts

2. How did you decide what logic to include in that implementation, and how does it separate solution concerns?

   - I included logic for tracking inputs, clearing errors, validating, saving, showing success, and resetting because those are part of how the form behaves
   - I kept the actual validation rules and saving logic in the service and repository so the hook only manages UI interaction and coordination between layers

3. Where is this implementation used and how?

   - It is used in DiscussionForm.tsx
   - Uses it to connect inputs to state
     - onChange={(e) => setTitle(e.target.value)}
   - Show the errors
     - {form.errors.has("postTitle") && ...}
   - Submit the form
     - Calls onSubmitForm() when user clicks the create button

# discussionService.ts

1. What does this Hook do?

   - This service handles the validation side for the discussion posts
   - It checks if a discussion is valid and creates the post when everything looks good

2. How did you decide what logic to include in that implementation, and how does it separate solution concerns?

   - I included logic for checking if all fields are filled, showing errors, and coordinating the save operation
     I left out UI and storage details so it only focuses on enforcing the rules and passing valid data to the repository

3. Where is this implementation used and how?
   - It is used in useDiscussionForm.ts
   - The hooks calls the services to validate.
     - const discussionErrors = await DiscussionService.validateDiscussion({userName: user, postTitle: title, postMessage: message},selectedGame);
   - If the validation passes, it calls the service to save it:
     - const createNewDiscussion = await DiscussionService.createNewDiscussion(discussion, gameID, gameName);

# CommunityHubRepo.ts

1. What does this Hook do?

   - This repo stores and gets the discussion data
   - It's the place that looks at the discussions from the MockCommunityPost.ts and can get all the discussions or add a new one to the list

2. How did you decide what logic to include in that implementation, and how does it separate solution concerns?

   - I included logic for retrieving the discussions array, adding a new discussion, and creating the correct data structure
   - I left out validation and UI details so this repository only handles storage making it easy to switch to a database in the next module

3. Where is this implementation used and how?
   - The service calls the repo to get the data:
     - export function fetchAllPosts(): Post[] {return discussionRepo.getDiscussions();}
   - As well as to save the data:
     - export async function createNewDiscussion(discussion, gameID, gameName) {return await discussionRepo.createDiscussion(discussion, gameID, gameName);}
