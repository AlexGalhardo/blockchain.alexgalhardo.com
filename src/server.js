const express = require("express");
const i18n = require("i18n");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n.init);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res, next) {
    res.render("index");
}).get("/:page", function (req, res, next) {
    res.render(req.params.page, { page: req.params.page });
});

app.use(function (req, res, next) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

if (app.get("env") === "development") {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err,
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {},
    });
});

i18n.configure({
    locales: ["en", "de", "es", "fr-CA", "hi", "ja", "ko", "nl", "pl", "pt", "zh-CN", "hu", "id"],
    directory: __dirname + "/locales",
});

app.listen(3000, "0.0.0.0", () => {
    console.log("\n\n...blockchain.alexgalhardo.com is running on http://localhost:3000!");
});
