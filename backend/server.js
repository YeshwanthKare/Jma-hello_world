const express = require("express");
const app = express();
const PORT = 3000;

app.get("/api", (req, res) => {
  res.send({ message: "Hello from the backend!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
