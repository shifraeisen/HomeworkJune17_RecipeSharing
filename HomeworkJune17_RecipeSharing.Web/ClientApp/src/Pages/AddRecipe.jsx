import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Preview from "../components/Preview";

const AddRecipe = () => {

    useEffect(() => {
        const getCategories = async () => {
            const { data } = await axios.get('/api/recipes/getcategories');
            setCategories(data);
        };
        getCategories();
    }, []);

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState();
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [isPublic, setIsPublic] = useState(false);

    const [ingTextBoxes, setIngTextBoxes] = useState(['']);
    const [ingTextBoxValues, setIngTextBoxValues] = useState({ 0: '' });

    const [stepTextBoxes, setStepTextBoxes] = useState(['']);
    const [stepTextBoxValues, setStepTextBoxValues] = useState({ 0: '' });

    const fileRef = useRef();

    const onAddIngClick = () => {
        setIngTextBoxes([...ingTextBoxes, '']);
    }

    const onAddStepClick = () => {
        setStepTextBoxes([...stepTextBoxes, '']);
    }

    const onIngTextChange = (e, index) => {
        setIngTextBoxValues({ ...ingTextBoxValues, [index]: e.target.value });
    }

    const onStepTextChange = (e, index) => {
        setStepTextBoxValues({ ...stepTextBoxValues, [index]: e.target.value });
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onFileChange = () => {
        setImage(fileRef.current.files[0]);
    }

    const onSubmitClick = async () => {
        await axios.post('/api/recipes/addrecipe', { title, categoryId, imageName: await toBase64(image), ingredients: JSON.stringify(Object.values(ingTextBoxValues)), steps: JSON.stringify(Object.values(stepTextBoxValues)), isPublic });
        navigate('/');
    }

    const onCatSwitch = e => {
        setCategoryId(e.target.value);
        setCategoryName(categories.find(c => c.id === +e.target.value).name);
    }

    let imageUrl = '';
    if (image) {
        imageUrl = URL.createObjectURL(image);
    }

    return (
        <div className="container" style={{ marginTop: 80 }}>
            <div className="container mt-5 d-flex">
                <div
                    className="card shadow-sm"
                    style={{
                        maxWidth: 600,
                        width: "100%",
                        borderRadius: 15,
                        backgroundColor: "rgb(248, 249, 250)"
                    }}
                >
                    <div className="card-body" style={{ padding: 20 }}>
                        <h2
                            className="mb-4 text-center"
                            style={{ fontFamily: "Arial, sans-serif", color: "rgb(52, 58, 64)" }}
                        >
                            Add a New Recipe
                        </h2>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Recipe Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="Title"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">
                                Category
                            </label>
                            <select className="form-select" id="category" onChange={onCatSwitch}>
                                <option value={-1} defaultValue hidden>Select a category</option>
                                {categories.map(c =>
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ingredients" className="form-label">
                                Ingredients
                            </label>
                            {ingTextBoxes.map((textBox, index) => (
                                <input
                                    key={index}
                                    type='text'
                                    className="form-control mb-2"
                                    onChange={e => onIngTextChange(e, index)}
                                />
                            ))}
                            <button type="button" className="btn btn-success" onClick={onAddIngClick}>
                                Add Ingredient
                            </button>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="steps" className="form-label">
                                Steps
                            </label>
                            {stepTextBoxes.map((textBox, index) => (
                                <textarea
                                    key={index}
                                    className="form-control mb-2"
                                    rows={3}
                                    onChange={e => onStepTextChange(e, index)}
                                />
                            ))}

                            <button type="button" className="btn btn-info" onClick={onAddStepClick}>
                                Add Step
                            </button>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                Upload Image
                            </label>
                            <input ref={fileRef} type="file" onChange={onFileChange} className="form-control" id="image" />
                        </div>
                        {imageUrl && <img
                            src={imageUrl}
                            alt="Recipe"
                            className="img-fluid mb-3"
                            style={{ maxHeight: 200, borderRadius: 10 }}
                        />}

                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" onChange={e => setIsPublic(e.target.checked)} />
                            <label className="form-check-label" htmlFor="isPublic">
                                Share this recipe publicly
                            </label>
                        </div>
                        <button
                            onClick={onSubmitClick}
                            className="btn btn-primary w-100"
                            style={{ marginTop: 10 }}
                        >
                            Add Recipe
                        </button>
                    </div>
                </div>
                <Preview
                    title={title}
                    categoryName={categoryName}
                    ingredients={Object.values(ingTextBoxValues)}
                    steps={Object.values(stepTextBoxValues)}
                    isPublic={isPublic}
                    image={imageUrl}
                />
            </div>
        </div>
    )
}
export default AddRecipe;