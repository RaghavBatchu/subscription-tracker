import { config } from 'dotenv';

// Load the correct .env file depending on NODE_ENV
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

// Export only the PORT variable
export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
