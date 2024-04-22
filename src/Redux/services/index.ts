import { RootState } from "../store";
import axios from "./api";

const AuthUserServices = {
    async adminLogin(adminLogin: object) {
        const { data } = await axios.get(`/employee/login`, adminLogin)
        return data
    },


    async createCategory(name: string) {
        const { data } = await axios.post('/category/create', name)
        return data
    },
    async allCategory() {
        const { data } = await axios.get('/categories')
        return data
    },
    async delCategory(id: number) {
        const { data } = await axios.delete(`/category/delete/${id}`)
        return data
    },


    async createQuestion(question:object) {
        const { data } = await axios.post('/question/create', question)
        return data
    },
    async categoryQuestion(category: number) {
        const { data } = await axios.get(`/questions/${category}`)
        return data
    },
    async categoryQuestionRandom(category: number) {
        const { data } = await axios.get(`/questions/random/${category}`)
        return data
    },
    async delQuestion(id: number) {
        const { data } = await axios.delete(`/question/delete/${id}`)
        return data
    },


    async userLogin(userLogin: object) {
        const { data } = await axios.post(`/user/login`, userLogin)
        return data
    },
    async userRegister(user: object) {
        const { data } = await axios.post('/user/register', user)
        return data
    },
    async users() {
        const { data } = await axios.get('/users')
        return data
    },


    async addResult(result: object) {
        const { data } = await axios.post('/result/create', result )
        return data
    },
    async result() {
        const { data } = await axios.get('/results')
        return data
    },


    async getme() {
        const { data } = await axios.get('/getme')
        return data
    },


    async logout() {
        const { data } = await axios.post('/logout')
        return data
    }
}

export default AuthUserServices