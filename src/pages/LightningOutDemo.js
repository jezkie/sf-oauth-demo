import { useState, useEffect } from 'react';

function LightningOutDemo() {
    const [showLightOut, setShowLightOut] = useState(false);
    const [frontdoorUrl, setFrontdoorUrl] = useState("");

    useEffect(() => {
        fetch('/api/lightningoutsingleaccess')
            .then(async (response) => {
                console.log('@@lightningoutsingleaccess response', response);
                const frontdoorUri = await response.json();
                console.log('@@lightningoutsingleaccess frontdoorUri', frontdoorUri.frontdoor_uri);
                setFrontdoorUrl(frontdoorUri.frontdoor_uri);
                setShowLightOut(true);
            })
    }, []);

    return (
        <div>
            <script type="text/javascript" async={true} src="https://mindful-narwhal-6i6s53-dev-ed.my.salesforce.com/lightning/lightning.out.latest/index.iife.prod.js"></script>

            {showLightOut && frontdoorUrl && (
                <div className="lightning-container">
                    <lightning-out-application 
                        app-id="1Usg5000000079ZCAQ" 
                        components="c-light-out" 
                        frontdoor-url={frontdoorUrl}>
                    </lightning-out-application>
                    <c-light-out></c-light-out>
                </div>
            )}
        </div>
    );
}

export default LightningOutDemo;