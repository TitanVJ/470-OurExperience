import app from './server';
import { server_config } from './config/config';

const PORT = server_config.port;
app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`));

// THIS IS THE EQUIV OF /BIN/WWW FROM THE experss-generator app