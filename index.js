import express from "express";
import data from "./data/mockData.json" assert { type: "json" };


const app = express();

const PORT = 3000;

//Using public folder at the root of the project
app.use(express.static("public"));

//custom route for loading images at /images
//buildin middleware of express
app.use("/images", express.static("images"));

//Using express.json and express.urlencoded
// app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//GET
app.get("/", (req, res) => {
  res.json(data);
});

//POST - Using express.json and express.urlencoded buildin middlewares
app.post("/item", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

//download method
app.get("/download", (req, res) => {
  res.download("images/Mountain_1.jpg");
});

//GET with next()
app.get(
  "/next",
  (req, res, next) => {
    console.log("This will be sent by next function");
    next();
  },
  (req, res) => {
    res.send("Hello Client, i setup a route with second callback");
  }
);

//redirect methods
app.get("/redirect", (req, res) => {
  res.redirect("http://www.linkedin.com/in/ssarthaks");
});

//GET with Routing Parameters
app.get("/class/:id", (req, res) => {
  const studentId = Number(req.params.id);
  const student = data.filter((student) => student.id === studentId);
  res.send(student);
});

// Chain Routing in Express
app
  .route("/class")
  .get((req, res) => {
    res.send("Retrieve class info");
    // throw new Error();
  })
  .post((req, res) => {
    res.send("Create a new class info");
  })
  .put((req, res) => {
    res.send("Update class info");
  });
//Route chaining
// app.get("/class", (req, res) => {
//   res.send("Retrieve class info");
// });
// app.post("/class", (req, res) => {
//   res.send("Create a new class info");
// });
// app.put("/class", (req, res) => {
//   res.send("Update class info");
// });

//POST
app.post("/create", (req, res) => {
  res.send("This is a POST request at /create");
});

//PUT
app.put("/edit", (req, res) => {
  res.send("This is a PUT request at /edit");
});

//DELETE
app.delete("/delete", (req, res) => {
  res.send("This is a DELETE request at /delete");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error, something is broken");
});

app.listen(PORT, () => {
  console.log(`The server is Listening on Port ${PORT}`);
});
