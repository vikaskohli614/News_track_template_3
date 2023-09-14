import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Categrious = ({ agencyDetails }) => {
    const [data, setData] = useState([]);
    const [fetch, setFetch] = useState(false);
    const navigate = useNavigate();

    const [categories, setCategory] = useState();

    const getCategoryName = (url) => {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].categories_Name_Url === url) {
                return categories[i].categories_Name_Hindi;
            }
        }
    };

    const getData = async (categories) => {
        try {
            const promises = categories.map((category) =>
                axios.get(
                    `http://174.138.101.222:8080/${agencyDetails._id}/get-Postnews/${category}`
                )
            );

            const responses = await Promise.all(promises);

            const newData = responses.map((response, index) => ({
                category: categories[index],
                data: response.data.data,
            }));

            setData((prevData) => [...prevData, ...newData]);
            setFetch(true);

            // console.log("data fetched");
        } catch (error) {
            console.log(error);
        }
    };

    const [input, setInput] = useState([]);
    const getCategories = async () => {
        try {
            const response = await axios.get(
                "http://174.138.101.222:8080/getmastercategories"
            );
            // console.log(response.data.data, "categories");
            setCategory(response.data.data);

            response.data.data.map((item) => {
                setInput((prev) => [...prev, item.categories_Name_Url]);
            });
        } catch (error) {
            console.log(error);
        }
    };
    // console.log(input, "input");
    useEffect(() => {
        getCategories();
        getData(input);
    }, [categories?.length]);


    function formatDate(inputDate) {
        const dateObj = new Date(inputDate);

        const day = dateObj.getUTCDate();
        const month = dateObj.toLocaleString("default", { month: "long" });
        const year = dateObj.getUTCFullYear();

        const formattedDate = `${day} ${month} ${year}`;
        return formattedDate;
    }


    return (
        <>
            <div className="cat-news">
                <div className="container">
                    <div className="row">
                        {fetch &&
                            data.map((item, index) => {
                                return (
                                    <>
                                        {item.data.length > 0 && (
                                            <div key={index} className="col-md-6">

                                                <h2>{getCategoryName(item.category)}</h2>

                                                <div className="row cn-slider">
                                                    {item.data
                                                        .reverse()
                                                        .slice(0, 2)
                                                        .map((news, index) => {
                                                            return (
                                                                <div key={index} className="col-md-6"  
                                                                    onClick={() => {
                                                                        // console.log("Img clicked");
                                                                        navigate(
                                                                            `/${agencyDetails._id}/DetailedNews/${news._id}`,
                                                                            {
                                                                                state: {
                                                                                    item: news,
                                                                                    agencyDetails: agencyDetails,
                                                                                },
                                                                            }
                                                                        );
                                                                    }}>
                                                                    <div className="image">
                                                                        <img
                                                                            src={`http://174.138.101.222:8080${news.image}`}
                                                                            alt={news.title}
                                                                        />
                                                                        <div className="cn-title">
                                                                            <a>
                                                                                {news.title}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                );
                            })}
                    </div>
                </div>
            </div>
            {/* Category News Start*/}
            {/* <div className="cat-news">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h2>खेल</h2>
                            <div className="row cn-slider">
                                <div className="col-md-6">
                                    <div className="image">
                                        <img src="http://174.138.101.222:8080/image/image_1692005820686.png" />
                                        <div className="cn-title">
                                            <a href="">प्रदेश में सबसे बड़ी इंदौर की चोइथराम सब्जी मंडी में व्यापारियों से 3 करोड़</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="image">
                                        <img src="http://174.138.101.222:8080/image/image_1692005820686.png" />
                                        <div className="cn-title">
                                            <a href="">प्रदेश में सबसे बड़ी इंदौर की चोइथराम सब्जी मंडी में व्यापारियों से 3 करोड़</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-6">
                            <h2>मनोरंजन</h2>
                            <div className="row cn-slider">
                                <div className="col-md-6">
                                    <div className="image">
                                        <img src="http://174.138.101.222:8080/image/image_1692005820686.png" />
                                        <div className="cn-title">
                                            <a href="">प्रदेश में सबसे बड़ी इंदौर की चोइथराम सब्जी मंडी में व्यापारियों से 3 करोड़</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="image">
                                        <img src="http://174.138.101.222:8080/image/image_1692005820686.png" />
                                        <div className="cn-title">
                                            <a href="">प्रदेश में सबसे बड़ी इंदौर की चोइथराम सब्जी मंडी में व्यापारियों से 3 करोड़</a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>

    )
}

export default Categrious
