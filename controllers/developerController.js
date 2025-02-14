import db from "../db/queries.js";

async function showDeveloper(req, res, next) {
    const { developerID } = req.params;
    const developerData = await db.getDeveloperData(developerID);

    res.render("developer", {title: developerData.name, developer: developerData});
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