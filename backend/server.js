const express = require("express");
const app = express();
const PORT = 3000;
let helmet = require("helmet");

app.disable("x-powered-by");
app.use(helmet.hidePoweredBy());

app.get("/api", (req, res) => {
  res.send({ message: "Hello from the backend!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
