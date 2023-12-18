const pUser = require('../models/userModel');

const getUsers = async (req, res) => {
    try {
        let query = {};

        if (req.query.name) {
            query.name = { $regex: new RegExp(req.query.name, 'i') };
        }

        let sortDirection = 1;
        if (req.query.sortByAge) {
            sortDirection = req.query.sortOrder === 'desc' ? -1 : 1;
            query.age = { $exists: true };
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const users = await pUser.find(query)
            .sort({ age: sortDirection })
            .skip(skip)
            .limit(limit);

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addUser = (req, res, next) => {

    console.log(req.body);

    const newUser = new pUser({
        "name" : req.body.name,
        "age" : req.body.age,
    });


    newUser
        .save()
        .then((data) => {
            res
                .status(200)
                .json({ message: "New user registered successfully", data: data });
        })
        .catch((error) => {
            console.log(error);
            res.json({ message: "Error in registering new user" });
        })
};

module.exports = { getUsers, addUser };
