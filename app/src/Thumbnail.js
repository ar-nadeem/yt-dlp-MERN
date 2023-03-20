export default function thumbnailComponent(props) {
    return (

        <div class={"col-sm visible"}>

            <img src={props.src} alt="Video thumbnail" class="img-thumbnail" />
            <h2>{props.title}</h2>
        </div>
    )
}