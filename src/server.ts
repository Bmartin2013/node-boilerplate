import app from "./app";

const PORT = process.env.SERVER_PORT || 6000;
app.listen(PORT, () => console.log(`🚀 server up and running: http://localhost:${PORT}`));