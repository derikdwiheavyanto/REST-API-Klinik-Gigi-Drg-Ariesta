import dashboard_service from "../service/dashboard_service.js"


const getDashboard = async (req, res, next) => {
    try {
        const data = await dashboard_service.getDashboard()
        res.status(200).json({ data: data })

    } catch (error) {
        next(error)
    }
}

export default {
    getDashboard
}