1. In public/index.html add the following under <head>. Make sure to replace YOUR-CLIENT-ID with, uhh, your client id.
    `<meta name="google-signin-client_id" content="YOUR-CLIENT-ID.apps.googleusercontent.com">`
    `<script src="https://apis.google.com/js/platform.js" async defer></script>`

2. Check out Auth.js. The login button is rendered as a div: `<div className='login-btn' id={GOOGLE_BUTTON_ID}></div>`. This does some funky stuff (because React) so we need to do some shit with componentDidMount. Idk, it works. Something about React not always deciding to render the script we inserted in index.html. This file contains everything needed to log in. The sendAuth method is identical to the previous version. The backend stays the same.

3. I did logout like this in App.js:
'logOut = () => {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        Cookies.remove('id_token')
        Cookies.remove('email')
        this.setState({loggedIn: false})
    });
}'

That should work, let me know if you have any questions. I used [this](https://developers.google.com/identity/sign-in/web/sign-in) guide to get it running.
