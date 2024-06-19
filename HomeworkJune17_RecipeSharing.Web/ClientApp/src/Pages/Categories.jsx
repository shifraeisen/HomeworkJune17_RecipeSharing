import axios from "axios";
import { useEffect, useState } from "react";

const Categories = () => {

    const getCatsAndAmt = async () => {
        const { data } = await axios.get('/api/recipes/getcategoriesandamounts');
        setCats(data);
    };

    useEffect(() => {
        getCatsAndAmt();
    }, []);

    const [cats, setCats] = useState([]);
    const [cat, setCat] = useState('');

    const onAddClick = async () => {
        await axios.post('/api/recipes/addcategory', { name: cat });
        getCatsAndAmt();
    }

    return (
        <div className="container" style={{ marginTop: 80 }}>
            <div className="container mt-5" style={{ maxWidth: 600 }}>
                <h2 className="mb-4 text-center">Categories</h2>
                <div className="input-group mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Add new category"
                        value={cat}
                        onChange={e => setCat(e.target.value)}
                    />
                    <button onClick={onAddClick} className="btn btn-primary">
                        Add
                    </button>
                </div>
                <ul className="list-group shadow-sm">
                    {cats.map(c =>
                        <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {c.name}<span className="badge bg-primary rounded-pill">{c.recipeCount}</span>
                        </li>
                    )}
                </ul>
            </div>
        </div>

    )
}

export default Categories;