import dotenv from 'dotenv';
dotenv.config();
import app from './src/app';
import { PORT } from './src/utils/config';

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});