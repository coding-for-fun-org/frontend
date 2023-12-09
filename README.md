# Coding for fun

My personal playground for coding and learning.

### How to set up github environment variables

1. Go to [profile](https://github.com/settings/profile) and click on `Developer settings` in the left menu
2. Click on Github Apps in the left menu
3. Click on `New Github App` button
4. Fill in the form
    1. Give it a name
    2. Give it a homepage url
        1. Example: `http://localhost:3000`
    3. Give it a callback url
        1. Example: `http://localhost:3000/api/auth/callback/github`
    4. Check `Expire user authorization tokens`
    5. Give it a setup url
        1. Example: `http://localhost:3000/github/callback/application-install`
    6. Check `Redirect on update`
    7. Click on `Generate a private key`
    8. Run the following command to convert the private key to pkcs8 format
        1. `openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in DOWNLOADED_PRIVATE_KEY_PATH -out private-key-pkcs8.key`
        2. Open the `private-key-pkcs8.key` file and copy the content
        3. Paste the content in the `GITHUB_PRIVATE_KEY` field in the `.env` file
    9. Click on `Create Github App`
    10. Copy the `Client ID` and paste it in the `GITHUB_ID` field in the `.env` file
    11. Copy the `Client secrets` and paste it in the `GITHUB_SECRET` field in the `.env` file
        1. If you don't see the `Client secrets` click on `Generate a new client secret` button
    12. Copy the `App ID` and paste it in the `GITHUB_APP_ID` field in the `.env` file
