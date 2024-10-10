# Pokemon Search App

This is a Pokémon search application built with Next.js, Tailwind CSS. The app allows users to search for Pokémon by name, view their details, and includes pagination, sorting, mock login functionality and filtering options.

## Features

- Search for Pokemon by name.
- Display Pokemon details, including name, image, and type(s).
- Display a list of Pokémon with pagination using limit and offset query parameters.
- Mobile-responsive design using Tailwind CSS.
- Error handling for invalid searches, including displaying a message when the search input is null or empty.
- Loading indicator while fetching data.
- Client-side routing implemented.
- Sorting and filtering options by name or base experience.
- Mock authentication for user access, for login any email and password can be used since it is a mock authentication.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/jagratijain/CodeWalnut-Assessment.git
```

### 2. Install Dependencies

pnpm install

### 2. Run Application

pnpm run dev

## Approach
Data Fetching: Leveraged the PokeAPI to retrieve Pokémon data, utilizing axios.

Search Functionality: Implemented a search bar that enables users to look up Pokémon by name, providing instant feedback on the validity of their searches.

Display of Pokémon Details: After a search, the application presents the Pokémon's name, image, type in a responsive layout.

Pagination: Introduced pagination to help users navigate through lists of Pokémon, using limit and offset parameters to manage the displayed data effectively.

## Challenges and Trade-offs
Error Handling: Developing robust error handling for invalid searches posed a challenge. I needed to ensure the app delivers clear feedback to users in case of a search failure.

Pagination Logic: Crafting an efficient pagination system that allows seamless browsing of Pokémon was complex. I had to find a balance between the number of Pokémon displayed and overall performance.

Responsive Design: Ensuring the application is fully responsive required meticulous attention to CSS and layout considerations, particularly for varying screen sizes.






