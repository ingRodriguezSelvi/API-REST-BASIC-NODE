
export const usersGet = (req, res) => {

    const {q, name = 'No name', apikey, page = 1, limit} = req.query;
    res.json({
        msg: 'get API',
        q,
        name,
        apikey,
        page,
        limit
    });
}

export const usersPut = (req, res) => {
    const { id } = req.params;

    res.status(201).json({
        msg: 'put API',
        id
    });
}

export const usersPost = (req, res) => {
    const {name, age} = req.body;
    res.status(201).json({
        msg: 'post API',
        name,
        age
    });
}

export const usersDelete = (req, res) => {
    res.json({
        msg: 'delete API'
    });
}

export const usersPatch = (req, res) => {
    res.json({
        msg: 'patch API'
    });
}