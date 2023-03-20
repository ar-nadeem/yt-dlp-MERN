import { useState } from 'react';
import Thumbnail from './Thumbnail';
import axios from 'axios';
// import { useEffect } from 'react';
import Loader from './Loader';
// import Toast from './Toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Search() {
    const api = 'http://localhost:5000/';

    const [img, setImg] = useState("https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg");
    const [downloadFound, setDownloadFound] = useState(false);
    const [searchURL, setSearchURL] = useState("");
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('PLACEHOLDER');
    const [downloadProgress, setDownloadProgress] = useState(0);
    // const [isDownloading, setIsDownloading] = useState(false);
    const [downloadLink, setDownloadLink] = useState("NULL");
    const [linkAvailable, setLinkAvailable] = useState(false);
    const [globalURL, setGlobalURL] = useState('NONE');

    const toastErrorInternal = () => {
        toast.error('Error -  INTERNAL', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    }
    const toastErrorURL = () => {
        toast.error('Error -  Fix URL', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    }

    const toastSuccess = () => {
        toast.success('Success !', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    }

    const handleSearch = async (e) => {
        setLoading(true)

        let isError = false;

        let myURL = searchURL//.split("v=")[1];
        setGlobalURL(myURL);

        let infoJson = {};
        await axios.post(api + 'getinfo/', { url: myURL }).then((response) => {
            infoJson = response.data;
        }).catch(err => { toastErrorURL(); isError = true; })


        if (!isError) {
            setImg(infoJson.thumbnail)
            setTitle(infoJson.title)
            setDownloadFound(true);
        }

        // setIsDownloading(false);
        setLoading(false)
    }

    // useEffect(() => {
    //     if (isDownloading) {
    //         runProgress();
    //     }
    // }, [isDownloading])

    const handleMP4 = async () => {
        setDownloadProgress(0)
        // setIsDownloading(true)

        setDownloadProgress(25)

        await axios.post(api + 'download/', { url: globalURL, format: "mp4" }).then((response) => {
            console.log(response.data);
        }).catch(err => { toastErrorInternal(); setDownloadProgress(0); return })

        setDownloadProgress(50)

        await axios.post(api + 'addDownload/', { url: globalURL, format: "mp4", thumbnail: img }).then((response) => {
            console.log(response.data);
        }).catch(err => { toastErrorInternal(); setDownloadProgress(0); return })

        setDownloadProgress(60)

        await axios.post(api + 'downloadfile/', { url: globalURL, format: "mp4" },
            {
                responseType: "blob",
            }).then((response) => {
                //console.log(response.data);
                //console.log(response.data)
                const href = URL.createObjectURL(response.data);
                setDownloadLink(href)
            }).catch(err => { toastErrorInternal(); setDownloadProgress(0); return })

        setDownloadProgress(100)
        toastSuccess();
        // setIsDownloading(false);
        setLinkAvailable(true);
    }

    // const handleWEBM = async () => {
    //     setIsDownloading(true);

    //     await axios.post(api + 'download/', { id: globalId, format: "webm" }).then((response) => {
    //         console.log(response.data);
    //     }).catch(err => { console.log(err) })

    //     runProgress();


    //     await axios.post(api + 'downloadfile/', { id: globalId, format: "webm" }).then((response) => {
    //         //console.log(response.data);
    //         const href = URL.createObjectURL(response.data);
    //         setDownloadLink(href)
    //     }).catch(err => { console.log(err) })

    //     setIsDownloading(false);
    //     setLinkAvailable(true);
    // }

    // const runProgress = async () => {
    //     console.log("I GOT CALLED")
    //     let dp = downloadProgress + 5;
    //     while (isDownloading && downloadProgress < 100) {
    //         console.log("Hello")
    //         setDownloadProgress(dp)
    //         await timer(200)
    //         dp += 1
    //         console.log(isDownloading)
    //     }
    //     setDownloadProgress(100)
    //     await timer(5000)
    //     setDownloadProgress(0)

    // }

    // const timer = ms => new Promise(res => setTimeout(res, ms))


    return (
        <div>
            <div class="container">
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <div class={"row"}>
                    {downloadFound && <Thumbnail src={img} title={title} />}

                    <div class="col-sm">
                        {loading && <Loader />}
                        <div class="input-group">
                            <input type="search" style={{ backgroundColor: "#FFFFFF" }} class="form-control rounded" placeholder="Enter Video URL" aria-label="Search" value={searchURL} onChange={e => setSearchURL(e.target.value)} onClick={() => { setSearchURL("") }}
                                aria-describedby="search-addon" />
                            <button type="button" onClick={(e) => handleSearch(e)} class="btn btn-primary">Search</button>
                        </div>

                        <div class="row">
                            {downloadFound &&
                                <div class="col-sm mt-5">
                                    <button type="button" onClick={() => handleMP4()} class="btn btn-primary" style={{ marginRight: '10px' }}>Download MP4</button>
                                    {/* <button type="button" onClick={() => handleWEBM()} class="btn btn-primary">Download Webm</button> */}
                                    {/* {isDownloading && */}
                                    <div class="progress mt-3" style={{ backgroundColor: "#6D6D6D" }}>
                                        <div class="progress-bar animated " role="progressbar" style={{ width: `${downloadProgress}%` }} aria-valuenow={downloadProgress} aria-valuemin="0" aria-valuemax="100">{downloadProgress + "%"}</div>
                                    </div>
                                    {/* } */}
                                    {linkAvailable &&
                                        <a href={downloadLink} target="__blank">
                                            <button type="button" variant="info" style={{ marginTop: '10px' }} class="btn btn-primary">Click to Download</button>
                                        </a>
                                    }
                                </div>
                            }
                        </div>

                    </div>

                </div>


            </div >

        </div >



    )

};