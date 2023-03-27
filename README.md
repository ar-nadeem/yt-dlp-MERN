# YT-DLP MERN

## What is this

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.JS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.JS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

I created this webapp as a way to learn the MERN stack. The app uses YT-DLP to download and serve MP4 (currently) files to users. The website that are supported by are the same as [YT-DLP](https://github.com/yt-dlp/yt-dlp).

## Directory structure

`App folder` contains the frontend and the backend is inside `backend folder` . The **old** folder has the frontend written in Bootstrap with spaghetti code **NOT TO BE USED**.

## About the frontend

Used React framework with tailwindcss to create responsive single page app that leverges backend API to serve video downloads. The components are atomic and seperate in the components directory.

## About the backend

#### The Routes

```javascript
router.route("/addDownload/").post; // POST url:url format:format img:img RES save to DB
router.route("/wipeDownload/").get; // GET RES Delete all history from DB
router.route("/getDownload/").get; // GET RES All downloads history in JSON
router.route("/getinfo/").post; // POST URL:https://xxxx.com/xxxx RES Json INFO
router.route("/download/").post; // POST url:https://xxxx.com/xxxx fromat:format RES Downloads the file
router.route("/downloadfile/").post; // POST URL:https://xxxx.com/xxxx RES blob of the file
```

Uses mongodb to store info related to downloads and use YT-DLP to download files and serve them.

## How to deploy for yourself ?

#### Frontend React:

1. Clone the repo.
2. Install required packages using

```Shell
npm install
```

3. Go to `src/components/Search.JS` and change the API `LINE 11` to the one you deploy in the backend.
4. Now create a minified optimized version of the app using

```Shell
npm run build
```

5. The build folder now has the app ready for deployment.

#### Backend Express.JS

1. Create a .env file in the root directory of your backend folder.

```Dotenv
ATLAS_URI=mongodb+srv://USER:PASSWORD@XXXXX.XXXXX.mongodb.net/?retryWrites=true&w=majority
port = 5000
```

the ATLAS_URI contains your mongodb connection string. The app will run on the port number you define on your .env file.

2. Now your backend server is ready for hosting.

## BUGS

- The file for saving is the last 11 characters of the url provided. This can be same for many files, If used a generic share link to download file. Hence duplicate downloads.

## Features to be added

- More formats.
- Better serving of files.
- Add a view for the history on the frontpage.
- Schedule deletion of downloads based on user preference.
