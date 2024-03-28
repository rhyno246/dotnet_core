import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activities";

const sleep =  (delay : number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:3000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (err) {
        console.log(err);
        return await Promise.reject(err);
    }
})

const responseBody = <T> (response : AxiosResponse<T>) => response.data;

const requests = {
    get : <T> (url : string) => axios.get<T>(url).then(responseBody),
    post : <T>(url : string, body : {}) => axios.post<T>(url ,body).then(responseBody),
    put : <T>(url : string, body : {}) => axios.put<T>(url , body).then(responseBody),
    delete : <T>(url : string) => axios.delete<T>(url).then(responseBody),
}

const Activities = { 
    list : () => requests.get<Activity[]>('/Activites'),
    detail : (id : string) => requests.get<Activity>(`/Activites/${id}`),
    create : (activity : Activity) => requests.post<void>('/Activites', activity),
    update : (activity : Activity) => requests.put<void>(`/Activites/${activity.id}` , activity),
    delete : (id : string) => requests.delete<void>(`/Activites/${id}`),
}

const agent = {
    Activities
}

export default agent;