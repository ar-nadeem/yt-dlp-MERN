export default function thumbnailComponent(props) {
    return (

        <div class={"col-sm visible"}>

            <img src={props.src} style={{ backgroundColor: "#6D6D6D" }} alt="Video thumbnail" class="img-thumbnail" />
            <h2 style={{ color: "#FFFFFF" }}>{props.title}</h2>
        </div>
    )
}