import db from "../db/queries.js";

async function showDeveloper(req, res, next) {
    const { developer } = req.params;
    if(developer == "new") {
        next();
        return;
    }
    const developerData = await db.getDeveloperData(developer);

    res.render("developer", {title: developer, developer: developerData});
}

async function showNewDeveloperForm(req, res) {
    res.render("developerForm");
}

async function createDeveloper(req, res) {
    const {name, country, headquarters, website} = req.body;
    await db.insertNewDeveloper(name, country, headquarters, website);

    res.redirect("/");
}

const developerController = {
    showDeveloper,
    createDeveloper,
    showNewDeveloperForm
}

export default developerController;