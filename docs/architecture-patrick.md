# allGamesRepo.ts

- What does this hook/service/repository do?

This is where we call our CRUD functions to call on our mock data since we do not have
a backend yet. This is to prepare for the backend for the later modules.


- How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns?

This repository file has the CRUD function logic wherein we call our mock data and have
the repo file handle what is needed to be handled for every function. This is also part of
preparation for the introduction of backend services later on.


- Where is this implementation made use of in the project and how?

This is implemented in the allGamesService file wherein the service file relies on the 
repo file for its CRUD functions to fetch and manage game data for components that relies
on this kind of functions.


# allGamesService.ts

- What does this hook/service/repository do?

This is where we use the business logic layer between the UI and the data repository. It calls
the repo functions to access game data and applies additional rules like validation logics before
it is to be used in hooks or components.

- How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns?

This service file's only logic related to my all games components and all are application rules,
data processing and/or validation logics.


- Where is this implementation made use of in the project and how?

This is implemented in the most if not all of the hooks I created to make sure that they apply business
logic and validation rules when processing datas.


# useAllGames.ts (hook)

- What does this hook/service/repository do?

This hook is where I fetch games from the service file, and make sure that when we toggle a game to be saved,
it saves and persist to the saved games page.


- How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns?

This hook is responsible to getting or fetching games in the mock data and also making sure that we can
toggle a game from a saved state and unsaved state.


- Where is this implementation made use of in the project and how?

This hook is implemented in my allGames and savedGames tsx files where we need to fetch games to display
and also toggle games to be able to be saved and displayed on the savedGames file.


# useFilteredGames.ts (hook)

- What does this hook/service/repository do?

This hook is where I filter my games list and where my search and genre and platforms dropdown menus are
located and is being used.


- How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns?

This hook is responsible for filtering the games list and also the search and dropdown menus.


- Where is this implementation made use of in the project and how?

This hook is implemented in my allGames and savedGames tsx files where we need to filter game list
and also we can search about the games and its genre and platform dropdowns.


# gameForm.ts (hook)

- What does this hook/service/repository do?

This hook is where I have all my form logics and this uses the useForm hook wherein it process
the other functions like reseting or submitting.


- How did you decide what logic to include in that implementation, and how does that correctly separate solution concerns?

This hook is responsible for all the gameForms that I needed to do for my all games 
components.


- Where is this implementation made use of in the project and how?

This hook is implemented in my addGamePage and editGamePage tsx files wherein we have forms for adding or 
editing a game. This still needs some fixing as the data we add doesn't persist yet and the edits
also doesn't persist yet. Will try to fix it whne we have the backend to incorporate with our data.

