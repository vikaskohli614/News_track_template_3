import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './Footer.css'

const Footer = ({ page_name }) => {
  const agencyDetails = useSelector((state) => {
    return state.User;
  });
  const [ad, setAd] = useState();

  const fetchAd = async () => {
    try {
      const response = await axios.get(`http://174.138.101.222:8080/${agencyDetails._id}/${page_name}/Footer/get-Advertisement`)
      // console.log(response.data.data[0], page_name)
      setAd(response.data.data[0])
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAd();
  }, [agencyDetails, page_name])
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-around", backgroundColor: "#e9ecef", padding: "20px" }}>

        <div className="headingpara">
          <a href="/" className='heading' ><h1>{agencyDetails.publication_name}</h1></a>
          <p className='para' style={{ marginBottom: "20px" }}>{agencyDetails.publisher_BIO}</p>


          <div style={{ display: "flex" }} >
            <a
              className="iconss"
              style={{ width: 38, height: 38 }}
              href={`https://${agencyDetails.pub_social_twitter}`}
              target="_blank"
            >
              <i className="fab fa-twitter" />
            </a>
            <a
              className="iconss"
              style={{ width: 38, height: 38 }}
              href={`https://${agencyDetails.pub_social_facebook}`}
              target="_blank"
            >
              <i className="fab fa-facebook-f" />
            </a>
            <a
              className="iconss"
              style={{ width: 38, height: 38 }}
              href={`https://${agencyDetails.pub_social_linkedin}`}
              target="_blank"
            >
              <i className="fab fa-linkedin-in" />
            </a>
            <a
              className="iconss"
              style={{ width: 38, height: 38 }}
              href={`https://${agencyDetails.pub_social_instagram}`}
              target="_blank"
            >
              <i className="fab fa-instagram" />
            </a>
            <a
              className="iconss"
              style={{ width: 38, height: 38 }}
              href={`https://${agencyDetails.pub_social_youtube}`}
              target="_blank"
            >
              <i className="fab fa-youtube" />
            </a>
          </div>
        </div>

        <div className="quick">
          <h4 className="quickHeading">Quick Links</h4>
          <div className="ufm">
            <a className="text-secondary mb-2" href="#">
              <i className="fa fa-angle-right text-dark mr-2" />
              About
            </a>
            <a className="text-secondary mb-2" href="#">
              <i className="fa fa-angle-right text-dark mr-2" />
              Advertise
            </a>
            <a className="text-secondary mb-2" href="#">
              <i className="fa fa-angle-right text-dark mr-2" />
              Privacy &amp; policy
            </a>
            <a className="text-secondary mb-2" href="#">
              <i className="fa fa-angle-right text-dark mr-2" />
              Terms &amp; conditions
            </a>
            <a className="text-secondary" href="#">
              <i className="fa fa-angle-right text-dark mr-2" />
              Contact
            </a>
          </div>
        </div>

      </div>

    </>
  )
}

export default Footer
