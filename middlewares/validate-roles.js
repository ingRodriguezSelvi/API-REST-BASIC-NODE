import {request, response} from "express";


export const isAdminRole = async (req = request, res = response, next) => {

    if (!req.userAuth) {
        return res.status(500).json({
            msg: 'Verify token first'
        });
    }
    const {role, name} = req.userAuth;
    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not an administrator`
        });
    }
    next();
}

export const hasRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.userAuth) {
            return res.status(500).json({
                msg: 'Verify token first'
            });
        }
        if (!roles.includes(req.userAuth.role)) {
            return res.status(401).json({
                msg: `The service requires one of these roles: ${roles}`
            });
        }
        next();
    }

}