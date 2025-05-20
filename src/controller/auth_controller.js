import authService from "../service/auth_service.js";

const login = async (req, res, next) => {
    try {
        const data = await authService.login(req.body)
        res.status(200).json({ data: data })
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        const data = await authService.logout()
        res.status(200).json({ data: data })
    } catch (error) {
        next(error)
    }
}

export default {
    login,
    logout
}

