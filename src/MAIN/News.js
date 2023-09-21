import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import advertisment from '../img/advertisment1.jpg'
const News = ({ props, page_name }) => {

    const { id } = useParams();
    const [breakingNews, setBreakingNews] = useState([]);
    const fetchBreakingNews = async () => {
        try {
            const response = await axios.get(
                `http://174.138.101.222:8080/${id}/getBreakingNews`
            );
            // console.log(response.data.data, "breaking");
            setBreakingNews(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchBreakingNews();
    }, []);
    const [ad, setAd] = useState();

    const fetchAd = async () => {
        try {
            const response = await axios.get(`http://174.138.101.222:8080/${id}/${page_name}/Below_Breaking_News/get-Advertisement`)
            // console.log(response.data.data[0])
            setAd(response.data.data[0])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchAd();
    }, [id, page_name])

    // pagination start here 

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = breakingNews.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (endIndex < breakingNews.length) {
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

    const totalPages = Math.ceil(breakingNews.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);



    return (
        <>
            <div className="tab-news">
                <div className="container">
                    <div className="row item">
                        <div className="col-md-6">
                            <ul className="nav nav-pills nav-justified">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="pill" href="#featured">
                                        Trending News
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div id="featured" className="container tab-pane active">
                                    {itemsToShow &&
                                        itemsToShow.map((news, index) => {
                                            return (
                                                <div key={index} className="tn-news">
                                                    <div className="tn-img">
                                                        <img
                                                            src={
                                                                news.image
                                                                    ? `http://174.138.101.222:8080${news.image}`
                                                                    : `https://www.newsclick.in/sites/default/files/2018-09/xfakenews_0.jpg.pagespeed.ic_.232PSP6q2x_0.jpg`
                                                            }
                                                            style={{
                                                                width: 100,
                                                                height: 100,
                                                                objectFit: "fill",
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="tn-title">
                                                        <Link
                                                            to={`/${id}/DetailedNews/${news._id}`}>
                                                            {news.title.length > 130
                                                                ? `${news.title.substring(0, 130)}...`
                                                                : news.title}
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '5px'
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
                                                        disabled={endIndex >= breakingNews.length}>
                                                        <i className="fa fa-angle-right text-primary mr-2" />
                                                        <i className="fa fa-angle-right text-primary mr-2" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 tn-right" style={{ padding: " 0px 29px" }}>
                            <div className="row">
                                <div>
                                    <h4>advertisement</h4>
                                </div>
                                <div className="image">
                                    <img src={`http://174.138.101.222:8080${ad?.image}`} alt="Ads" />
                                </div>
                                <div style={{ margin: "20px  0px 10px 0px" }}>
                                    <h4>News Letter</h4>
                                    <p >Aliqu justo et labore at eirmod justo sea erat diam dolor diam vero kasd</p>
                                    <input type="text" className='mytext' />
                                    <button className='btn'>SIGN UP</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default News
