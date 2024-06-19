import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const Home = () => {

    useEffect(() => {
        const getTop3RecentRecipes = async () => {
            const { data } = await axios.get('/api/recipes/gettop3recentrecipes');
            setRecipes(data);
            setIsLoading(false);
        };
        getTop3RecentRecipes();
    }, []);

    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    if (isLoading) {
        return <div className='container' style={{ marginTop: 300 }}>
            <div className='d-flex w-100 justify-content-center align-self-center'>
                <img src='/src/images/loadingimage/Ripple@1x-1.0s-200px-200px.gif' />
            </div>
        </div>
    }

    return (
        <div className="container" style={{ marginTop: 80 }}>
            <div
                className="container mt-5"
                style={{
                    backgroundColor: "rgb(245, 245, 245)",
                    padding: 20,
                    borderRadius: 10
                }}
            >
                <div className="jumbotron bg-light p-5 rounded-lg mb-4 shadow">
                    <h1 className="display-4">Welcome to Recipe Sharing App!</h1>
                    <p className="lead">
                        Explore the most delicious recipes shared by our community. Share your
                        own recipes and get inspired by others!
                    </p>
                    <hr className="my-4" />
                    <p>Here are some of the latest recipes:</p>
                </div>
                <div className="row">
                    {recipes.map(r =>
                        <RecipeCard key={r.id} recipe={r} />
                    )}
                </div>
            </div>
        </div>

    );
};

export default Home;