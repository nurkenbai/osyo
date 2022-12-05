import axios from "axios";
import md5 from "md5";
// https://mbs-edu.herokuapp.com
const BASE_URL = `http://192.168.0.127:8080`;
// const BASE_URL = `http://osiyo-back.mbs-edu.uz/`;
// let BASE_URL = `https://mbs-edu.herokuapp.com;`
export const BASEURL = `${BASE_URL}/api/v1/attach/open/`;
export const loginAPi = async (datas) => {
    console.log(datas)
    const header = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const {data} = await axios.post(
            `${BASE_URL}/api/v1/auth/profile/login`, datas, header
        )
    ;

    return data;
}


export const getCurrent = async () => {
    const token = localStorage.getItem(md5('token'))
    const header = {
        headers: {
            'Authorization': `Bearer ${token}`,

        }
    }
    const {data} = await axios.get(`${BASE_URL}/api/v1/profile/current`, header)

    return data;
}
export const getProfile = async (body) => {

    const token = localStorage.getItem(md5('token'))

    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const {data} = await axios.put(`${BASE_URL}/api/v1/profile`, body, header)
    return data;
}
export const profileSave = async (body) => {

    const token = localStorage.getItem(md5('token'))

    const header = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
    const {data} = await axios.post(`${BASE_URL}/api/v1/profile`, body,
        header
    )
    return data;
}

export const profileUpdate = async (body, id) => {

    const token = localStorage.getItem(md5('token'))

    const header = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
    const {data} = await axios.put(`${BASE_URL}/api/v1/profile/${id}`, body,
        header
    )
    return data;
}
export const getProfileById = async (id) => {

    const token = localStorage.getItem(md5('token'))

    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const {data} = await axios.get(`${BASE_URL}/api/v1/profile/${id}`, header)
    return data;
}
export const getMain = async () => {

    const token = localStorage.getItem(md5('token'))

    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const {data} = await axios.get(`${BASE_URL}/api/v1/profile/count`, header)
    return data;
}

export const deleteProfileById = async (id) => {

    const token = localStorage.getItem(md5('token'))

    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const {data} = await axios.delete(`${BASE_URL}/api/v1/profile/${id}`, header)
    return data;
}


export const getOrganizationPagiantion = async (page, size, body) => {

    const token = localStorage.getItem(md5('token'))
    let bodys = {};
    if (!body) {
        bodys = body
    }

    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const {data} = await axios.post(`${BASE_URL}/api/v1/organization/filter/adm?page=${page}&size=${size}`, bodys, header)
    return data;
}
export const filialSave = async (body) => {

    const token = localStorage.getItem(md5('token'))

    const header = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
    const {data} = await axios.post(`${BASE_URL}/api/v1/filial`, body,
        header
    )
    return data;

}
export const filialUpdate = async (body, id) => {

    const token = localStorage.getItem(md5('token'))

    const header = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
    const {data} = await axios.put(`${BASE_URL}/api/v1/filial/${id}`, body,
        header
    )
    return data;
}
export const getFilial = async () => {

    const token = localStorage.getItem(md5('token'))


    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const {data} = await axios.get(`${BASE_URL}/api/v1/filial`, header)
    return data;
}

export const deleteFilialById = async (id) => {

    const token = localStorage.getItem(md5('token'))

    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const {data} = await axios.delete(`${BASE_URL}/api/v1/filial/${id}`, header)
    return data;
}

export const getFilialById = async (id) => {

    const token = localStorage.getItem(md5('token'))

    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const {data} = await axios.get(`${BASE_URL}/api/v1/filial/${id}`, header)
    return data;
}
export const getClient = async (body, page, size) => {

    const token = localStorage.getItem(md5('token'))

    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const {data} = await axios.post(`${BASE_URL}/api/v1/client/filter?page=${page}&size=${size}`, body, header)
    return data;
}
export const clientSave = async (body) => {

    const token = localStorage.getItem(md5('token'))

    const header = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
    const {data} = await axios.post(`${BASE_URL}/api/v1/client`, body,
        header
    )
    return data;

}
export const file = async (body) => {


    const {data} = await axios.post(`${BASE_URL}/api/v1/attach/upload`, body,
    )
    return data;

}
export const deleteClientById = async (id) => {

    const token = localStorage.getItem(md5('token'))

    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const {data} = await axios.delete(`${BASE_URL}/api/v1/client/${id}`, header)
    return data;
}
export const getTicketByCliendId = async (id) => {

    const token = localStorage.getItem(md5('token'))

    const header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    const {data} = await axios.get(`${BASE_URL}/api/v1/ticket/get/${id}`, header)
    return data;
}