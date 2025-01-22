const highlightText = (text, search) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);
    const data = parts.map((part, index) =>
        part.toLowerCase() === search.toLowerCase() ? (
            <span key={index} style={{ backgroundColor: "#ffcc00", fontWeight: "bold" }}>
                {part}
            </span>
        ) : (
            part
        )
    );
    return data
};

export default highlightText;