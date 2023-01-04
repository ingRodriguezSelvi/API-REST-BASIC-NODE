import {User} from "../models/user.models.js";
import bcrypt from "bcryptjs";
export const usersGet = async(req, res) => {

    const {limit = 5, from = 0} = req.query;
    const query = {deleted: false};
    const [total, users] = await Promise.all([
        User.countDocuments({query}),
        User.find({ query })
            .skip(from)
            .limit(limit)
    ]);
    res.json({
        total,
        users
    });
}

export const usersPut = async(req, res) => {
    const {id} = req.params;
    const {password,google,_id,...rest} = req.body;

    //TODO: Validate against DB
    if (password) {
        // Encrypt password
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.status(201).json({
        msg: 'put API',
        user
    });
}

export const usersPost = async (req, res) => {

    const {name, email, password, role} = req.body;
    const user = new User({
        name,
        email,
        password,
        role
    });
    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Save user
    await user.save();
    res.status(201).json({
        user
    });
}

export const usersDelete = async (req, res) => {
    const {id} = req.params;

    // Delete UserFiscally
    // const user = await User.findByIdAndDelete(id);

    // Delete User Logically
    const user = await User.findByIdAndUpdate(id, {deleted: true});

    res.json({
        user
    });
}

export const usersPatch = (req, res) => {
    res.json({
        msg: 'patch API'
    });
}