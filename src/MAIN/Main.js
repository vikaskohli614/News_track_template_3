
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import BreakingNews from '../img/breakingnews.jpeg'
import advertisment from '../img/advertisment.jpg'


const Main = ({ agencyDetails, breakingNews, page_name }) => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategory] = useState([]);
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://174.138.101.222:8080/getmastercategories"
      );
      setCategory(response.data.data);

    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getCategories();
  }, []);

  // Pagination for categories
  const [currentCategoryPage, setCurrentCategoryPage] = useState(1);
  const categoryItemsPerPage = 8; // Number of categories to display per page

  const startIndex = (currentCategoryPage - 1) * categoryItemsPerPage;
  const endIndex = startIndex + categoryItemsPerPage;
  const categoriesToShow = categories.slice(startIndex, endIndex);

  const handleNextCategoryPage = () => {
    if (endIndex < categories.length) {
      setCurrentCategoryPage(currentCategoryPage + 1);
    }
  };

  const handlePrevCategoryPage = () => {
    if (startIndex > 0) {
      setCurrentCategoryPage(currentCategoryPage - 1);
    }
  };

  const handleCategoryPageClick = (pageNumber) => {
    setCurrentCategoryPage(pageNumber);
  };

  const categoryTotalPages = Math.ceil(categories.length / categoryItemsPerPage);
  const categoryPageNumbers = Array.from(
    { length: categoryTotalPages },
    (_, i) => i + 1
  );



  return (
    <div className="container" style={{ marginBottom: "20px" }} >
      <div className="row " >
        <div className="col-md-8 col-sm-12">
          <div style={{ maxHeight: '400px' }}>
            <Carousel
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              autoPlay={true}
              showIndicators={false}
              showArrows={true}
              emulateTouch={true}
            >
              {breakingNews.length &&
                breakingNews.map((news) => {
                  return (
                    <div
                      key={news._id}
                      className="w-100 d-block"

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
                      }}
                    >
                      <img
                        src={

                          news.image
                            ? `http://174.138.101.222:8080${news.image}`
                            : `https://www.newsclick.in/sites/default/files/2018-09/xfakenews_0.jpg.pagespeed.ic_.232PSP6q2x_0.jpg`
                        }
                        alt="..."
                        height={'300px'}
                      />
                      <div style={{ width: '100%', height: '100px' }} >
                        <h5>{news.title}</h5>
                        <p>{news.short_details}</p>
                      </div>
                    </div>
                  );
                })}
            </Carousel>
          </div>
          <div style={{ height: '100px' }} >
            {
              ad?.script.length > 0 && <p className="mb-0" style={{ border: '1px solid black', width: '100%', height: '100px', overflow: 'hidden' }}>{ad?.script}</p>
            }
            {
              ad?.text.length > 0 && <p className="mb-0" style={{ border: '1px solid black', width: '100%', height: '100px', overflow: 'hidden' }}>{ad?.text}</p>
            }
            {
              ad?.image.length > 0 && <img style={{ width: '100%', height: '100%' }} src={`http://174.138.101.222:8080${ad?.image}`} />
            }
          </div>
        </div>
        <div className="col-md-4 col-sm-12 d-flex flex-column justify-content-between">
          <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-1">
            <h3 className="m-0">Categories</h3>
          </div>
          {categoriesToShow &&
            categoriesToShow.map((item, index) => {
              return (
                <div
                  key={index}
                  className="position-relative overflow-hidden"
                  style={{
                    height: "11%",
                    backgroundColor: 'rgb(184 179 179)',
                    minHeight: "50px",
                    marginTop:'10px'
                  }}
                  onClick={() =>
                    navigate(
                      `/${agencyDetails._id}/Category/${item.categories_Name_Url}`,
                      {
                        state: { agencyDetails },
                      }
                    )
                  }
                >

                  <p style={{ textAlign: 'center', marginTop: 10 }} className="overlay align-items-center justify-content-center h4 mb-0 text-white text-decoration-none">
                    {item.categories_Name_Hindi}
                  </p>
                </div>
              );
            })}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop:'10px'
            }}
          >
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={handlePrevCategoryPage}
                    disabled={currentCategoryPage === 1}
                  >
                    <i className="fa fa-angle-left text-primary mr-2" />
                    <i className="fa fa-angle-left text-primary mr-2" />
                  </a>
                </li>
                {categoryPageNumbers.map((pageNumber) => (
                  <li className="page-item" key={pageNumber}>
                    <a
                      className={`page-link page-number-button ${pageNumber === currentCategoryPage ? 'active' : ''
                        }`}
                      onClick={() => handleCategoryPageClick(pageNumber)}
                    >
                      {pageNumber}
                    </a>
                  </li>
                ))}
                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={handleNextCategoryPage}
                    disabled={endIndex >= categories.length}
                  >
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
  )
}

export default Main
