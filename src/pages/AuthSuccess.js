import React, { useState, useEffect } from 'react';

function AuthSuccess() {

    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    useEffect(() => {
        const hashWithAccessToken = window.location.hash;
        if (hashWithAccessToken && hashWithAccessToken.indexOf('access_token')) {
            console.log(hashWithAccessToken.substring(hashWithAccessToken.indexOf('=')+1));
    
            const access_token = hashWithAccessToken.substring(hashWithAccessToken.indexOf('=')+1, hashWithAccessToken.indexOf('&refresh_token'));
            console.log('access_token', access_token);
    
            fetch(`/api/oauth2/access_token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: `{"access_token": "${access_token}"}`
            }).then(result => {
                setShowSuccessMsg(true);
                console.log(result)
            });
    
        } else {
            const params = new URLSearchParams(window.location.search);
    
            console.log(params.get('code'));
    
            fetch(`/api/oauth2/token?code=${params.get('code')}`)
            .then(async response => {
                const tokens = await response.json();
                setShowSuccessMsg(true);

                console.log('accessToken', tokens.access_token);
                console.log('refreshToken', tokens.refresh_token);
            })
            .catch(error => console.error("Error fetching data:", error));
        }
    }, []);


    return (
        <div>
            {showSuccessMsg === true ? (
                <p>Authentication Successful, you may now close this page.</p>
            ) : 
                <p>Authenticating...</p>
            }
        </div>
        
    )
}

export default AuthSuccess;
