function Grid(props) {

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {props.children}
        </div>
    )
}

export default Grid