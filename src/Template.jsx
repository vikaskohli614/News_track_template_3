
import Top from './Header/Top'
import Categrious from './MAIN/Categrious'
import News from './MAIN/News'
import Footer from './Footer/Footer'
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./redux/slices/UserSlice";
import { addAd } from "./redux/slices/AdSlice";

import Main from './MAIN/Main'

const Template = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
  
    const [agencyDetails, setAgencyDetails] = useState();
  
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://174.138.101.222:8080/${id}/get-publication-details`
        );
        setAgencyDetails(response.data.data[0]);
        dispatch(addUser(response.data.data[0]));
        document.title = response.data.data[0].publication_name
        const favicon =document.getElementById("favicon"); // Accessing favicon element
      favicon.href = `http://174.138.101.222:8080${response.data.data[0].logo_small}`;
        
      } catch (error) {
        console.log(error);
      }
    };
    const adDetail = useSelector((state)=>state.Ad)
  const [adDetails, setAdDetails]= useState();
  const fetchAd = async ()=>{
    try {
      const response =await axios.get(`http://174.138.101.222:8080/${id}/get-Advertisement`)
      setAdDetails(response.data.data)
      dispatch(addAd(response.data.data))
    } catch (error) {
      console.log(error)
    }
  }
  
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
      fetchData();
      fetchBreakingNews();
      // fetchAd()
    }, []);


  return (
    <div>
    { <Top page_name={'Home_Page'} /> }
    {agencyDetails && breakingNews && (<Main page_name={'Home_Page'} agencyDetails={agencyDetails} breakingNews={breakingNews}  />)}
    {agencyDetails && breakingNews &&  (<Categrious page_name={'Home_Page'} agencyDetails={agencyDetails} breakingNews={breakingNews} />)}
    {agencyDetails && breakingNews && (<News page_name={'Home_Page'} />)}
     {agencyDetails && breakingNews && ( <Footer page_name={'Home_Page'} agencyDetails={agencyDetails} />)}
    </div>
  )
}

export default Template
