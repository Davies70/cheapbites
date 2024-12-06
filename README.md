# CheapBites

CheapBites is a web application designed to help users discover affordable dining options in their vicinity. It uses geolocation, interactive maps, and APIs to provide tailored restaurant recommendations, allowing users to explore, review, and save favorite dining spots.

---

## Features

- **Search & Discover**: Find budget-friendly restaurants near your location using the FourSquare API.
- **Interactive Maps**: Adjust the search radius and explore dining options via a Leaflet-powered map.
- **User Management**: Save favorite places, manage visited locations, and contribute reviews.
- **Reviews & Recommendations**: Read reviews from other users and get personalized suggestions based on dietary preferences and a fun food quiz.
- **Authentication**: Secure user accounts and sessions with NextAuth.

---

## Tech Stack

- **Frontend**
    - Next.js: For server-side rendering and a dynamic, SEO-friendly user interface.
    - TypeScript: Ensures type safety, improving code quality and reducing runtime errors.
    - Tailwind CSS: Provides a modern, responsive UI design.
- **Backend**
    - Next.js API Routes: Manages backend services, including user authentication, geolocation, and data retrieval.
    - MongoDB: A flexible, document-oriented database for storing user preferences, reviews, and restaurant data.
    - Authentication: Secure OAuth-based authentication using NextAuth.
- **APIs & Services**
    - FourSquare API: Provides rich restaurant data for discovery.
    - Geoapify API: Powers geolocation features to enhance user experience.
    - Leaflet: Enables interactive map functionality.

---

## Live Demo

Visit [CheapBites](https://cheapbites.vercel.app) to see the app in action!

## Screenshots

### Home Page

![Home Page](/public/cheapbites4.PNG)  
_The vibrant home page interface displaying restaurant recommendations._

### Search Results

![Map](/public/cheapbites2.png)  
_Interactive map showcasing search results and adjustable radius._

### Dashboard

![Dashboard](/public/reviews.PNG)  
_Manage saved places, visited locations, and reviews from your profile page._

###

![Place Page](/public/page.PNG)  
_View place details and atttributes, write reviews and save place._

To replace the placeholder images above, add actual screenshots of the web app to your repository and update the URLs. For example:

```markdown
![Home Page](/public/cheapbites.PNG)
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn
- MongoDB

---

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/cheapbites.git
   cd cheapbites
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**  
   Create a `.env.local` file in the project root and add the following variables:

   ```plaintext
   FOURSQUARE_API_KEY=fsq33uhuuYycdX/rClU+A0JznEPjfiR0ud+CrpwqaI2S3m8=
   GEOAPIFY_API_KEY=<Your_Geoapify_API_Key>
   MONGODB_URI=<Your_MongoDB_URI>
   GOOGLE_CLIENT_ID=<Your_Google_Client_ID>
   GOOGLE_CLIENT_SECRET=<Your_Google_Client_Secret>
   NEXTAUTH_SECRET=<Your_NextAuth_Secret>
   ```

   Replace placeholders with your actual API keys and credentials.

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

---

## Deployment

To deploy CheapBites, follow the instructions for your chosen hosting provider (e.g., Vercel, Netlify). Ensure all environment variables are properly set up in the hosting platform.

---

## API Keys

- **FourSquare API**: Provides restaurant data. [Get your API key here](https://developer.foursquare.com/docs).
- **Geoapify API**: Used for geolocation services. [Get your API key here](https://www.geoapify.com/).
- **Google Client ID/Secret**: Used for Google authentication via NextAuth. [Set up Google OAuth](https://console.cloud.google.com/).
- **MongoDB URI**: Connection string for your MongoDB database. [Get started with MongoDB](https://www.mongodb.com/).

---

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm start`: Starts the production server.

---

## Contributing

Contributions are welcome! Feel free to open issues or pull requests to improve the app.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or feedback, reach out at [your email/contact info].

---

**Happy Eating with CheapBites!**
