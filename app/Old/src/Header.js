export default function Header() {
    return (

        // <div className="flex justify-between items-center bg-[#4a0511] p-7">
        //     <h1 className="text-2xl font-mono text-white text-left">Video Downloader</h1>
        //     <a href="https://www.linkedin.com/in/abdulrahman-nadeem/" target="_blank" className="text-2xl font-mono underline decoration-2 text-white text-right">arnadeem</a>
        // </div>

        <header class="d-flex justify-content-between flex-row py-3" style={{ backgroundColor: '#4a0511' }}>
            <p class="h5 ps-3" style={{ color: '#FFFFFF' }}> Video Downloader</p>
            <p class="h5" style={{ color: '#FFFFFF' }}> Powered by YT-DLP</p>
            <a class="h5  pe-3" style={{ color: '#FFFFFF' }} href="https://www.linkedin.com/in/abdulrahman-nadeem/" rel="noreferrer" target="_blank">ArNadeem</a>
        </header >



    );
}   