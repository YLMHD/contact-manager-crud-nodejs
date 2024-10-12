const express = require("express"); // Import express
const {
  getContacts,
  getContact,
  addContact,
  updateContactForm,
  updateContact,
  updateContactAvatar,
  deleteContact
} = require("../controllers/Contact");

const upload = require("../config/fileUpload"); // Import the multer configuration

const router = express.Router(); // Make a router

// Define the route for the root URL of the site

// route to get all users
router.get("/", getContacts);

// route to get all users
router.get("/contact", (req, res) => {
  res.redirect("/");
}
);
// route to get about page
router.get("/about", (req, res) => {
  res.render("pages/about", { title: "About" });
});

// route to get a specific user
router.get("/contact/:id", getContact);

// route GET to create a user
router.get("/add-user", (req, res) => {
  res.render("contact/add_contact", { title: "Add contact" });  
});

// route POST to create a user
router.post("/add-contact", upload.single("image"), addContact);

// route GET to update a user
router.get("/edit/:id", updateContactForm);

// route POST to update a user
router.post("/edit/:id", upload.any(), updateContact);

// route POST to update a user avatar
router.post("/edit-avatar/:id", upload.single("image"), updateContactAvatar);

// route to delete a user
router.get("/delete/:id", deleteContact);

// route to handle 404 error page
router.get("/error-404", (req, res) => {
  res.status(404).render("errors/404", { title: "404! Page not found" });
});

router.all("*", (req, res) => {
  res.status(404).render("errors/404", { title: "404! Page not found" });
});

// Export the router
module.exports = router;
