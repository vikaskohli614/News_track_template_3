import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import advertisment from '../img/advertisment1.jpg'
const News = ({ props, page_name }) => {

    const { id } = useParams();
    const [breakingNews, setBreakingNews] = useState();
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
                                    {breakingNews &&
                                        breakingNews.map((news, index) => {
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
                                                        {/* <img src="http://174.138.101.222:8080/image/image_1693986860740.jpg" /> */}
                                                    </div>
                                                    <div className="tn-title">
                                                        <a href="">
                                                            {news.title} scasjc</a>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 tn-right" style={{ padding: " 0px 29px" }}>
                            <div className="row">
                                <div>
                                    <h4>advertisement</h4>
                                </div>
                                <div className="image">
                                    {/* <img src={advertisment} alt="" /> */}
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
