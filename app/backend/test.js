const runProgress = async () => {
    let check = isDownloading
    while (check == true) {
        console.log(1)
        await timer(250)
    }
    setDownloadProgress(100)
    await timer(5000)
    setDownloadProgress(0)


}

const timer = ms => new Promise(res => setTimeout(res, ms))

isDownloading = true;
runProgress();