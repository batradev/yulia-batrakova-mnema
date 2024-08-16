# Mnema Project Proposal

## Overview

Mnema is an app that helps language learners create personalized mnemonics to enhance memory retention. It combines words and images, packaging them into a format convenient for use in Anki.

### Problem

People learning a new language from scratch face several challenges.

First, they need to memorize hundreds of new words, so it's important to systematize the learning process. The flashcard method, where a card contains only the word and its translation, helps, but it could be improved.

Second, if the learning process feels boring or monotonous, our brain begins to resist—reducing concentration, causing fatigue, or creating a desire to quit. Each time, it becomes increasingly harder to return to studying.

Finally, even memorized words are easily forgotten if they were not learned effectively or if they are not reviewed regularly.

### Solution

Mnema uses mnemonic techniques to create vivid visual images, which significantly enhances memory retention. Mnema personalizes images for each user based on their interests and preferences, making it easier to remember words by evoking strong emotional engagement.

Why it works:

**Visualization:** Vivid and detailed images stay in memory longer. Our brain is naturally tuned to process and store visual information, with visual images activating more areas associated with memory.

**Associations:** Our memory functions as a network, where new elements are anchored to existing connections. By linking new words to familiar knowledge, we create strong associative connections in the brain.

**Engagement:** Images tied to personal interests become more meaningful, making the learning process more emotionally charged. The brain perceives personalized information as important, leading to better retention.

### User Profile

Language learners:

1. Individuals at any level of language proficiency who want to improve their vocabulary.
2. Users who need an efficient method to quickly memorize and retain large amounts of vocabulary.
3. Those who prefer a visual learning approach and seek an engaging, interactive way to remember new words.


### Features

As a user, I want to understand the core mission of Mnema and start the process of learning quickly. Two options: "Get started" for new users and "I already have an account" for returning users.

As a new user, I want to create an account by providing my email and password.

As a returning user, I want to log in to my account using my email and password.

As a user, I want to choose the language I want to learn.

As a user, I want to select my native language from a list of options.

As a user, I want to specify my interests to personalize the learning experience.

As a user, I want to choose or enter my professions to further customize the learning content.

As a user, I want to input words that I want to learn and generate translations, mnemonic descriptions and images for them.

As a user, I want to review the table with generated words, translations, and mnemonic descriptions. If I am not satisfied with a description, I can click a button to regenerate it. Once all descriptions are satisfactory, I can click "Create Images."

As a user, I can view the generated images and descriptions, and then download an Anki word list to continue learning offline.


### Tech Stack

**Frontend:**
1. React for building the user interface.
2. JavaScript for client-side scripting.
3. Axios for making HTTP requests to the backend.
4. React-router for handling client-side routing and navigation.

**Backend:**
1. Node.js with Express for handling server-side logic and API requests
2. Axios for making HTTP requests to GPT API
3. MySQL for storing user data and preferences
4. Knex.js for building SQL queries and managing database migrations
5. [openai](https://github.com/openai/openai-node) npm client package
6. Python with genanki for generating Anki packages (.apkg files) based on user input

**Authentication:**
1. bcrypt for hashing passwords 
2. JSON Web Tokens (JWT) for managing user sessions and protecting routes
3. (OR... Passport.js for managing authentication strategies)


### APIs

1. OpenAI GPT-4 API: For generating mnemonic descriptions based on user input.
2. DALL-E API (Future integration): For generating images to accompany mnemonic descriptions.

### Sitemap

Home Page: Introduction and navigation options.

Registration Page: User registration.

Login Page: User login.

Language Selection Page: Choose the language to learn.

Native Language Selection Page: Choose the native language.

Interests Selection Page: Select personal interests.

Profession Selection Page: Choose or input profession.

Add Words Page: Input words for learning.

Results Page: Display generated words, translations, and mnemonics. Users can regenerate descriptions if needed. Once satisfied, they can click "Create Images."

Visuals & Download Page: Display generated images, mnemonics, and provide a download option for the Anki word list.

### Endpoints

1. **User Registration:**

- **Method:** POST
- **URL:** `/api/register`
- **Request Body:** `{ email: string, password: string }`
- **Response:**

```
{
  "status": "success",
  "errors": []
}

```

2. **User Login:**

- **Method:** POST
- **URL:** `/api/login`
- **Request Body:** `{ email: string, password: string }`
- **Response:**

```
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
}

```


3. **Select Target Language:**

- **Method:** POST
- **URL:** `/api/settings`
- **Request Body:** `{ userId: string, target_language: string }`
- **Response:**

```
{
  "status": "success",
  "errors": [],
}
```


4. **Select Primary Language:**

- **Method:** POST
- **URL:** `/api/settings`
- **Request Body:** `{ userId: string, primary_language: string }`
- **Response:**

```
{
  "status": "success",
  "errors": [],
}

```

5. **Select Interests:**

- **Method:** POST
- **URL:** `/api/interests`
- **Request Body:** `{ userId: string, interests: [string] }`
- **Response:**

```
{
  "status": "success",
  "errors": [],
}
```

6. **Select Profession:**

- **Method:** POST
- **URL:** `/api/professions`
- **Request Body:** `{ userId: string, professions: [string] }`
- **Response:**
`
```
{
  "status": "success",
  "errors": [],
}
```

7. **Submit Words:**

- **Method:** POST
- **URL:** `/api/words`
- **Request Body:** `{ words: [string] }`
- **Response:**

```
{
  "data": [{"id": 1234, "word": "to play", "translation": "jouer"}]
  "status": "success",
 
}

```

For translations generation will be used [openai](https://github.com/openai/openai-node) npm package.

8. **Get Mnemonic Descriptions from Backend:**

- **Method:** POST
- **URL:** `/api/words/:word_id/mnemonics`
- **Query Parameters:** `{}`
- **Response:**

```
{
  "data": 
    {
      "word_id": "1234",
      "mnemonic": "Imagine a jaguar playing soccer on a field. The jaguar is skillfully dribbling the ball, surrounded by a stadium filled with cheering fans."
    },

  "status": "success",
}

```
 

**Request Mnemonic Descriptions from GPT-4:**

When the frontend sends a request to the backend to get mnemonic descriptions, the backend will make a request to the GPT-4 API. For descriptions generation will be used [openai](https://github.com/openai/openai-node) npm package.


9. **Get Images from Backend:**

- **Method:** POST
- **URL:** `/api/words/:word_id/images
- **Query Parameters:** `{}`
- **Response:**

```
{
  "images": [
    {
      "word_id": "1234",
      "url": "/assets/images/image1234.jpg"
    }
  ],
  "status": "success"
}

```


**Request from Backend to DALL-E API:**

For image generation will be used [openai](https://github.com/openai/openai-node) npm package.
Example of usage: https://platform.openai.com/docs/guides/images/image-generation.


10. **Download File:**

- Method: GET
- URL: `/api/download`
- Query Parameters: `{}`
- Response:
```
{
  "url": "https://example.com/path/to/my/file1.apkg"
}
```

### Auth

- **JWT Authentication**:
    - Secure user login with JSON Web Tokens (JWT).
    - Store JWT in local storage and include in API requests for secure access.
    - The token will be deleted when user is logged out.


### Roadmap

**1. Create Client project**. Set up the React project with initial routes and pages. Use React Router for navigation.

**2. Create Server project**. Set up the Express server with basic routes. Use Node.js with Express for server-side logic and API handling.

**3. Set Up Database Migrations**. Define the database schema using Knex.js to create the necessary tables in MySQL: users, interests, professions, words, mnemonics, images, users_words.

**4. Seed Database**. Populate the MySQL database with sample data (languages, interests, professions) using Knex.js.

**5. Deploy Client and Server**. Deploy the React frontend and Express backend to production (Heroku?).

**6. Implement User Registration**. Build the registration page with React. Create the `POST /api/register` endpoint in Express. 

**7. Implement User Login**. Build the login page with React.  Create the `POST /api/login` endpoint in Express. 

**8. Implement Language Selection**. Create pages for selecting target and native languages using React. Set up `POST /api/settings` endpoints in Express.

**9. Implement Interests and Profession Selection**. Build pages for selecting interests and profession using React. Create `POST /api/interests` and `POST /api/professions` endpoints in Express.

**10. Implement Word Submission**. Create a page for entering words and translations using React.  Set up the `POST /api/words` endpoint in Express.

**11. Generate Mnemonic Descriptions**. Add logic in Express to request mnemonic descriptions from GPT-4. Create the `POST /api/words/:word_id/mnemonics` endpoint.  Store descriptions in MySQL.

**12. Generate Images with DALL-E**. Add logic in Express to request images from DALL-E based on mnemonic descriptions. Create the `POST /api/words/:word_id/images` endpoint.  Store image URLs in MySQL.

**13. Build Results Page**. Create a page in React to display mnemonic descriptions with options to regenerate. Implement functionality to confirm descriptions and create images.

**14. Build Visuals & Download Page**. Create a page in React to display images and mnemonic descriptions. Use Python with `genanki` to generate Anki packages (.csv/.apkg files). Create the `GET /api/download` endpoint in Express.

**15. Implement JWT Authentication**. Add JWT authentication to protect routes after core features are implemented.  Update backend to verify JWT tokens. Manage sessions in React using localStorage.

**16. Fix Bugs and Optimize**. Identify and fix bugs, optimizing performance across the React frontend and Express backend.

## Nice-to-haves

**Audio Pronunciation**: Add audio pronunciation for each word in the user's deck. This can be done by integrating a text-to-speech API or using pre-recorded audio files.

**Creating and storing custom decks by the user.**

**Pre-built Decks**: Provide users with ready-made decks of flashcards on specific themes (e.g., travel, food, basic phrases). This allows users to start learning immediately without waiting for image generation.
