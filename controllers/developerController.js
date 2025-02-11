import db from "../db/queries.js";

async function showDeveloper(req, res) {
    const { developer } = req.params;
    const developerData = await db.getDeveloperData(developer);

    res.render("developer", {title: developer, developer: developerData});
}

const developerController = {
    showDeveloper
}

export default developerController;