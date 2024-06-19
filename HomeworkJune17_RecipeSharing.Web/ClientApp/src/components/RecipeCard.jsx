import { BsCheckCircleFill, BsListUl, BsFillPersonFill } from "react-icons/bs";

const RecipeCard = ({ recipe }) => {

    const { title, ingredients, steps, imageName, isPublic, dateCreated, category } = recipe;

    return (
        <div className={"col-md-4 mb-4"}>
            <div className="card shadow-sm h-100" style={{ borderRadius: 15 }}>
                <div
                    className="card-body d-flex flex-column"
                    style={{ maxHeight: 500, overflow: "hidden" }}
                >
                    <h3
                        className="text-center"
                        style={{
                            fontFamily: "Arial, sans-serif",
                            color: "rgb(52, 58, 64)"
                        }}
                    >
                        {title}
                    </h3>
                    <div className="d-flex justify-content-center mb-3">
                        <img
                            src={`/api/images/view?img=${imageName}`}
                            alt="Recipe Preview"
                            className="img-fluid"
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: 10,
                                objectFit: "cover"
                            }}
                        />
                    </div>
                    <div style={{ flex: "1 1 auto", overflowY: "auto" }}>
                        <p>
                            <strong>Category:</strong> {category.name}
                        </p>
                        <p>
                            <strong>Ingredients:</strong>
                        </p>
                        {JSON.parse(ingredients).map(i =>
                            <div key={i} className="mb-2">
                                <BsCheckCircleFill style={{ color: "#28A745", marginRight: 10 }} />
                                <span>{i}</span>
                            </div>
                        )}
                        <p>
                            <strong>Steps:</strong>
                        </p>
                        <div className="mb-2">
                            {JSON.parse(steps).map(s =>
                                <div key={s} className="d-flex align-items-start mb-1">
                                    <BsListUl style={{ color: "#17A2B8", marginRight: 10, marginTop: 5 }} />
                                    <span>{s}</span>
                                </div>
                            )}
                        </div>
                        <p>
                            <strong>Public:</strong>{" "}
                            <BsFillPersonFill style={{ color: isPublic ? "#28A745" : "#DC3545" }} />
                        </p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default RecipeCard;
