export default function Thumbnail({ src, title, alt, h, w }) {
    if (alt === undefined) {
        alt = "Video thumbnail"
    }
    if (h === undefined) {
        h = "48"
    }
    if (w === undefined) {
        w = "96"
    }

    return (
        <div>
            <h className="text-white text-sm font-bold italic">{title}</h>
            <img className={`object-contain h-${h} w-${w} bg-gray-100`} src={src} alt={alt} />
        </div>
    )
}