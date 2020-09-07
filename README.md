# Caravan
[![Build Status](https://travis-ci.com/SDBagel/Turbodrive.svg?branch=caravan)](https://travis-ci.com/SDBagel/Turbodrive) [![codecov](https://codecov.io/gh/SDBagel/Turbodrive/branch/caravan/graph/badge.svg)](https://codecov.io/gh/SDBagel/Turbodrive)

Turbocharged Canvas client.

This project is built on [this boilerplate](https://github.com/maximegris/angular-electron).

## Change of Plans Notice

This project was originally intended to be a simple file sync between Classroom assignments and OneDrive/Microsoft 365, allowing students to work on files in Microsoft Word, Excel, and PowerPoint. It quickly blossomed into a full-fledged Classroom and partial Drive client - however, due to the severe limitations in Google's APIs, this is not feasible.

Google's API does not include [material groups](https://issuetracker.google.com/issues/115421140), [certain parts of class management, comments, and teacher comments (DMs)](https://developers.google.com/classroom/reference/rest). I'd appreciate if more attention was brought to these issues on the Google forums and feedback tools.

Core functionality is still planned for this variant of the app. Our school district has switched to using [Canvas](https://github.com/instructure/canvas-lms) - which means my top priority is getting this supported first since I'm very dissatisfied with the Canvas UI (and would be too large of an undertaking on the official repo). This can be found in the `caravan` branch of this repo. Eventually, the two will either get merged or one service will get chosen as the core service of Turbodrive.

Below is the full original project statement.

## 🛠 Designed By Users, for Users

Turbodrive is built with real user (student) feedback in mind. Google Classroom is workable, but it could be way better, and that's where this project comes in.

### Design Goals
- Information: It should communicate info quickly across and without confusion.
- Inclusivity: It should be easy to transition from a GSuite service like Classroom.
- Speed: It should reduce loading times through a variety of techniques and redesigns.

## ⚡ Power Up With Microsoft 365

If you have access to the Google APIs and the local filesystem, why not power up with Microsoft 365? Edit documents and work on Google Classroom assignments completely offline using Microsoft 365's comprehensive suite of tools. Manage your Microsoft To Do and Calendar directly in-app.

# Setup
There is currently no packaged release of Turbodrive. Follow the steps below to get started with the source code. Also see [Known Issues](#Issues) below.

1) Clone the git repo [`https://github.com/SDBagel/Turbodrive.git`]

2) Run `npm install`

3) Create a project & OAuth 2.0 **iOS Application** with the [Google Developer Console](https://console.developers.google.com/apis/credentials). This is the Google recommended workaround to not publishing a client secret with the app.

4) Set the callback URL of your app to be `http://localhost:4200/oauthcallback`

5) Create a `src/environments/environment.ts` file to contain your client ID and callback URL. The format of this file should look like the `src/environments/environment.example.ts` file. A spot for a client secret is provided but should be left empty unless you know what you are doing.

6) Run `npm start` to build and start the electron process. Due to the use of the Google NodeJS auth library it is incompatible running as a webserver only. There may be plans to change this.

The electron window will open and should redirect you to the Google Auth page. Sign in with Google and you will be redirected back to the home page where you can see all active Google Classrooms you are in (and maybe other stuff as this gets more updates).