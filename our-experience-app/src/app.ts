import app from './server';
import { server_config } from './config/config';

const PORT = server_config.port;
app.listen(PORT, () => console.log(`⚡ Magic is happening at http://localhost:${PORT}`));

// THIS IS THE EQUIV OF /BIN/WWW FROM THE experss-generator app