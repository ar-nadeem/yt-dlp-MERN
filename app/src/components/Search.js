import Thumbnail from './Thumbnail';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner'
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default function Search() {


    const api = 'http://182.176.84.112:5000/';
    //const api = 'http://localhost:5000/';
    const [img, setImg] = useState("https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg");
    const [downloadFound, setDownloadFound] = useState(false);
    const [searchURL, setSearchURL] = useState("");
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('PLACEHOLDER');
    const [downloadLink, setDownloadLink] = useState("NULL");
    const [linkAvailable, setLinkAvailable] = useState(false);
    const [globalURL, setGlobalURL] = useState('NONE');
    ////////////////////////////////////// TOAST Functions //////////////////////////////////////
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


    //////////////////////////////////////////////////////////////////////////////////////////////////

    const handleSearch = async (e) => {
        setLoading(true)

        let isError = false;

        let myURL = searchURL//.split("v=")[1];
        setGlobalURL(myURL);

        let infoJson = {};
        await axios.post(api + 'getinfo/', { url: myURL }).then((response) => {
            infoJson = response.data;
        }).catch(err => { toastErrorURL(); isError = true; console.log(err) })


        if (!isError) {
            setImg(infoJson.thumbnail)
            setTitle(infoJson.title)
            setDownloadFound(true);
            toastSuccess();
        }
        else {
            setDownloadFound(false);
        }

        // setIsDownloading(false);
        setLoading(false)
    }

    const handleMP4 = async () => {
        const toastLoading = toast.loading("Downloading ...")


        await axios.post(api + 'download/', { url: globalURL, format: "mp4" }).then((response) => {
            console.log(response.data);
        }).catch(err => { toastErrorInternal(); })


        await axios.post(api + 'addDownload/', { url: globalURL, format: "mp4", thumbnail: img }).then((response) => {
            console.log(response.data);
        }).catch(err => { toastErrorInternal(); })


        await axios.post(api + 'downloadfile/', { url: globalURL, format: "mp4" },
            {
                responseType: "blob",
            }).then((response) => {
                //console.log(response.data);
                const href = URL.createObjectURL(response.data);
                setDownloadLink(href)
            }).catch(err => { toastErrorInternal(); })


        toast.dismiss(toastLoading);
        toastSuccess();
        setLinkAvailable(true);
    }


    if (downloadFound === true) {
        return (
            <div>

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
                {
                    loading &&
                    <div style={center}>
                        <InfinitySpin width='200' color="#FFFFFF" />
                    </div>
                }
                <div class="grid grid-cols-2">
                    <div className="col-span-1 mx-auto pl-2">
                        <Thumbnail src={img} title={title} alt={title} />
                    </div>
                    <div className="col-span-1 mx-auto w-full px-3">
                        <input value={searchURL} onChange={e => setSearchURL(e.target.value)} onClick={() => { setSearchURL("") }}
                            class={inputClass}
                            id="search" type="text" placeholder="Enter View URL"></input>
                        <button onClick={(e) => handleSearch(e)}
                            className={inputButtonClass}>Search</button>
                        <button onClick={(e) => handleMP4()}
                            className={inputButtonClass + " ml-5"}>Get MP4</button>
                        {linkAvailable &&
                            <div>
                                <br />
                                <a href={downloadLink} target="__blank">
                                    <button className={inputButtonClass + " ml-5"}>Download !</button>
                                </a>
                            </div>
                        }

                    </div>


                </div>
            </div>
        );
    }
    else {
        return (


            <div>
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
                {
                    loading &&
                    <div style={center}>
                        <InfinitySpin width='200' color="#FFFFFF" />
                    </div>
                }
                <div class="grid grid-cols-2">
                    <div className="col-span-2 mx-auto w-full px-3">
                        <input value={searchURL} onChange={e => setSearchURL(e.target.value)} onClick={() => { setSearchURL("") }}
                            class={inputClass}
                            id="search" type="text" placeholder="Enter View URL"></input>
                        <button onClick={(e) => handleSearch(e)}
                            className={inputButtonClass}>Search</button>
                    </div>


                </div>
            </div>
        );
    }

};

const inputClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
const inputButtonClass = "bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-1 px-2 rounded";
const center = {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-50px",
    marginLeft: "-50px",
}