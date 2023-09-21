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
            setCategory(response.data.data);

            response.data.data.map((item) => {
                setInput((prev) => [...prev, item.categories_Name_Url]);
            });
        } catch (error) {
            console.log(error);
        }
    };
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


    // pagination start here 

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Number of items to display per page

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = data.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (endIndex < data.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (startIndex > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);




    return (
        <>
            <div className="cat-news">
                <div className="container">
                    <div className="row">
                        {fetch &&
                            itemsToShow.map((item, index) => {
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
                                                                    style={{ width: "280px", height: "200px" }}
                                                                    onClick={() => {
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
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link"
                                            onClick={handlePrevPage}
                                            disabled={currentPage === 1}>
                                            <i className="fa fa-angle-left text-primary mr-2" />
                                            <i className="fa fa-angle-left text-primary mr-2" />
                                        </a>
                                    </li>
                                    {pageNumbers.map((pageNumber) => (
                                        <li className="page-item">
                                            <a
                                                key={pageNumber}
                                                className={`page-link page-number-button ${pageNumber === currentPage ? 'active' : ''}`}
                                                onClick={() => handlePageClick(pageNumber)}
                                            >
                                                {pageNumber}
                                            </a>
                                        </li>
                                    ))}
                                    <li className="page-item">
                                        <a className="page-link"
                                            onClick={handleNextPage}
                                            disabled={endIndex >= data.length}>
                                            <i className="fa fa-angle-right text-primary mr-2" />
                                            <i className="fa fa-angle-right text-primary mr-2" />
                                        </a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Categrious
