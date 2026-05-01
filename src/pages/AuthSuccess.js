function AuthSuccess() {
    const hashWithAccessToken = window.location.hash;
    if (hashWithAccessToken && hashWithAccessToken.indexOf('access_token')) {
        console.log(hashWithAccessToken.substring(hashWithAccessToken.indexOf('=')+1));

        const access_token = hashWithAccessToken.substring(hashWithAccessToken.indexOf('=')+1, hashWithAccessToken.indexOf('&refresh_token'));
        console.log('access_token', access_token);

        fetch('http://localhost:3000/oauth2/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: `{"access_token": "${access_token}"}`
        }).then(result => console.log(result));

    }

    return (
        <div>
            <p>Authentication Successful, you may now close this page.</p>
        </div>
    )
}

export default AuthSuccess;
