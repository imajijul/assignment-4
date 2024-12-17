import {tokenDecoded} from "../Utility/TokenUtil.js";

const authMiddleware = async (req, res, next) => {
    let token = req.headers.token // header a vul token dile decode hoy na + how to set token into headers

    if (!token) {
        token = req.cookies.token
    }

    const data =  await tokenDecoded(token);

    if(data === null) {
        res.json({"status": "fail", "message": "invalid token"});
    } else {
        req.headers.id = data._id;
        req.headers.phone = data.phoneNumber;

        next()
    }
}

export default authMiddleware;