function onLoadLogin() {

    gigya.socialize.addEventHandlers({
        onLogin: onLoginHandler
    });

    gigya.socialize.showLoginUI({
        height: 100
        ,width: 330
        ,showTermsLink:false
        ,hideGigyaLink:true
        ,buttonsStyle: 'fullLogo'
        ,showWhatsThis: true
        ,containerID: 'loginDiv'
    });

    function onLoginHandler(eventObj) {
        sendSignatureToBackend(eventObj.UID, eventObj.timestamp, eventObj.signature, eventObj.provider, eventObj.user.identities[eventObj.provider].providerUID);
    }

    function sendSignatureToBackend(UID, timestamp, signature, provider, user) {
        var encodedUID = encodeURIComponent(UID);
        var encodedTimestamp = encodeURIComponent(timestamp);
        var encodedSignature = encodeURIComponent(signature);
        var encodedUser = encodeURIComponent(user);
        var encodedProvider = encodeURIComponent(provider);
        var url = "/api/v1/login?uuid=" + encodedUID +
            "&timestamp=" + encodedTimestamp +
            "&signature=" + encodedSignature +
            "&nickname=" + encodedUser +
            "&loginProvider=" + encodedProvider;
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                window.location = "logout.html?nickname=" + encodedUser + "&loginProvider=" + encodedProvider;
            }
        };
        try {
            xhr.send();
        } catch (err) {
            alert(err)
        }
    }

}

function onLoadLogout() {

    gigya.socialize.addEventHandlers({
        onConnectionAdded: onConnectionAddedHandler
    });

    gigya.socialize.showAddConnectionsUI({
        height: 100
        ,width: 330
        ,containerID: 'socDiv'
    });

    function onConnectionAddedHandler(eventObj) {
        alert("Well done! You are now socializing through " + eventObj.provider + ".");
    }

}

function logoutHandler() {
    gigya.socialize.logout({callback:redirectToLogin});
}


function redirectToLogin(response) {
    if ( response.errorCode == 0 ) {
        window.location = "login.html";
    } else {
        alert('Error :' + response.errorMessage);
    }
}