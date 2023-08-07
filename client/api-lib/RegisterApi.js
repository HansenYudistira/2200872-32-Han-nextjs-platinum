function RegisterApi(payload) {
    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
        urlencoded.append("email", payload.email);
        urlencoded.append("username", payload.username);
        urlencoded.append("password", payload.password);
        urlencoded.append("confirm_password", payload.confirm_password);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    return fetch(`${process.env.REACT_APP_BE_URL}/register`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

export { RegisterApi };