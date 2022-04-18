// require('dotenv').config(); some how it doesn't work

export const EACH_ROW = 5; // magic number from design
export const PORT = process.env.PORT || 3000; // process.env doesn't work right now, find the way to fix it later
export const API_PORT = process.env.API_PORT || 3001;
