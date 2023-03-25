export default function Loader() {
    const center = {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-50px",
        marginLeft: "-50px",
        width: "100px",
        height: "100px"
    }

    return (
        <div>
            <div class="loading" style={center}>Loading&#8230;</div>
            <div class="content"><h3>Getting Video INFO !</h3></div>
        </div >
    );
};
