import axios from "axios"
const BASE_URL = 'http://134.209.186.30/api/v1/';


function auth_handler(setHide, setMessage, navigation, nav, endPoints, data, headers) {
    setHide(false)
    fetch(`${BASE_URL}/${endPoints}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)

    }).then(res => {
        return Promise.all([res.status, res.json()]);
    }).then(res => {
        if (res[0] == 400) {
            setHide(true)

            setMessage(res[1].error)
        } else if (res[0] == 200) {

            setHide(true)
            navigation.navigate(nav, res[1]);
        }
    }).catch((error) => {
        setHide(true)
        setMessage(error.message)
        console.log(error)
    });
}

function isValidEmail(value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
    if (value == "") {
        setEmailError("")
    }
    else if (isValidEmail(value)) {
        setEmailError("")
    }
    else {
        setEmailError("Invalid Email")
    }
}

function validatePassword(value, setPasswordError) {
    if (value.length < 9) {
        setPasswordError("Password must be 9 characters")
    } else {
        setPasswordError("")
    }
}


const fetch_handler = async (endPoints, token, method) => {
    try {

        const response = await axios({
            method: method,
            url: `${BASE_URL}/${endPoints}`,
            headers: { "Authorization": `Bearer ${token}` },

        })
        return response

    } catch (error) {
        console.log(error)
    }
}

const post_handler = async (endPoints, token, data, method) => {
    try {
        const response = await axios({
            method: method,
            data: data,
            url: `${BASE_URL}/${endPoints}`,
            headers: { "Authorization": `Bearer  ${token}` },

        })
        return response

    } catch (error) {

        const { response } = error;
        const { request, ...errorObject } = response;
        console.log(JSON.stringify(response.data.message));
    }
}

const utils = {
    auth_handler,
    fetch_handler,
    post_handler,
    isValidEmail,
    validateEmail,
    validatePassword
}
export default utils