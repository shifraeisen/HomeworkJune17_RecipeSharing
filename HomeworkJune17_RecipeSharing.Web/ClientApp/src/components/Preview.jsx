import { BsCheckCircleFill, BsListUl, BsFillPersonFill } from "react-icons/bs";

const Preview = ({ title, categoryName, ingredients, steps, isPublic, image }) => {
    return (
        <div
            className="card shadow-sm ms-4"
            style={{
                position: "sticky",
                top: 20,
                maxWidth: 400,
                width: "100%",
                height: "fit-content",
                borderRadius: 15,
                backgroundColor: "rgb(248, 249, 250)"
            }}
        >
            <div className="card-body" style={{ padding: 20 }}>
                <h3
                    className="text-center"
                    style={{ fontFamily: "Arial, sans-serif", color: "rgb(52, 58, 64)" }}
                >
                    Recipe Preview
                </h3>
                <div className="card shadow-sm h-100" style={{ borderRadius: 15 }}>
                    <div
                        className="card-body d-flex flex-column"
                        style={{ maxHeight: 500, overflow: "hidden" }}
                    >
                        <h3
                            className="text-center"
                            style={{ fontFamily: "Arial, sans-serif", color: "rgb(52, 58, 64)" }}
                        >
                            {title || ''}
                        </h3>
                        <div className="d-flex justify-content-center mb-3">
                            {image && <img
                                src={image}
                                alt="Recipe Preview"
                                className="img-fluid"
                                style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: 10,
                                    objectFit: "cover"
                                }}
                            />}
                        </div>
                        <div style={{ flex: "1 1 auto", overflowY: "auto" }}>
                            <p>
                                <strong>Category:</strong> {categoryName}
                            </p>
                            <p>
                                <strong>Ingredients:</strong>
                            </p>
                            <div className="mb-2">
                                {ingredients.map(i =>
                                    <div key={i} className="mb-2">
                                        <BsCheckCircleFill style={{ color: "#28A745", marginRight: 10 }} />
                                        <span>{i}</span>
                                    </div>
                                )}
                                <p>
                                    <strong>Steps:</strong>
                                </p>
                                {steps.map(s =>
                                    <div key={s} className="d-flex align-items-start mb-1">
                                        <BsListUl style={{ color: "#17A2B8", marginRight: 10, marginTop: 5 }} />
                                        <span>{s}</span>
                                    </div>
                                )}

                                <p>
                                    <strong>Public:</strong>{" "}
                                    <BsFillPersonFill style={{ color: isPublic ? "#28A745" : "#DC3545" }} />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preview;