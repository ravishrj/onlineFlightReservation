"use client"

import { useState } from "react";
import Calender from "../calender/page";
import CustomCalendar from "../calendar_2/page";
import { searchFlight }  from "../_services/operations/searchFlightApi";
import axios from "axios";
const REACT_APP_AMADEUS_CLIENT_ID="6KjF3w8cmzm5jvgkePQnLAB9ufdMiUnH";
const REACT_APP_AMADEUS_CLIENT_SECRET="hx7l3jSMq1AK9lFx"


const FlightForm=()=>{
    //const url=  `https://api.amadeus.com/v2/shopping/flight-offers?origin=${"delhi"}&destination=${"kolkata"}&departureDate=${"02/12/2024"}`;
    const [oneWay, setOneway] = useState(false);
    const [srcClickedToggeled, setSrcClickedToggle] =  useState(false);
    const [srcClickedToToggeled, setSrcClickedToToggle] =  useState(false);
    const [srcClickedDepartToggeled, setSrcClickedDepartToggle] =  useState(false);
    const [srcClickedReturnToggeled, setSrcClickedReturnToggle] =  useState(false);
    const [srcClickedTravellersToggeled, setSrcClickedTravellersToggle] =  useState(false);
    const [srcClickedCoachToggeled, setSrcClickedCoachToggle] =  useState(false);
    const [srcClickedSearchFlightToggeled, setSrcClickedSearchFlightToggle] =  useState(false);
    const [formData, setFormData] = useState({
     
      OriginCode: "",
        
      
    
  })

   const [OriginCode, setOrigin] = useState('');
  // const [destination, setDestination] = useState('');
  // const [departureDate, setDepartureDate] = useState('');
  // const [adults, setAdults] = useState(1);
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState('');

  const handleOnSubmit = async(e) => {
    // e.preventDefault();
    
    // const results = await searchFlight(url);
    // console.log(results);
  
    try {
     
      // Get the access token
      const tokenResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', new URLSearchParams({
          'grant_type': 'client_credentials',
          'client_id': REACT_APP_AMADEUS_CLIENT_ID,
          'client_secret': REACT_APP_AMADEUS_CLIENT_SECRET
      }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      
      const accessToken = tokenResponse.data.access_token;

      // Search for flights
      const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
          params: {
              originLocationCode: 'JFK',
              destinationLocationCode: 'SFO',
              departureDate: '2024-10-15',
              adults: 1,
          },
      });
      console.log(response.data.data);
      setFlights(response.data.data.data);
      // console.log(flights);
  } catch (error) {
    console.log(process.env.REACT_APP_AMADEUS_CLIENT_ID);
    console.log(process.env.REACT_APP_AMADEUS_CLIENT_SECRET);
      console.error('Error fetching flight offers:', error);
      setError('Failed to fetch flight offers. Please try again.');
  }

    
  

}

    const handleOnChange = (e) => {
      setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
      }))
  }



    return <div
    className="flighttab hide active"
    id="Flights"
    style={{ display: "block" }}
  >
    <form id="formFlightSearchEngine">
      <div className="selectflighttype">
        <ul>
          <li
            className={!oneWay && "active"}
            id="T_RT"
            onclick="ShowHideSearchEngineTab('RT')"
            href="javascript:void(0)"
            onClick={()=> setOneway(false)}
          >
            ROUND-TRIP
          </li>
          <li
            className={oneWay && "active"}
            id="T_OW"
            onClick={()=> setOneway(true)}
            href="javascript:void(0)"
          >
            ONE-WAY
          </li>
        </ul>
      </div>
      <div className="widget-form" id="Tp_roundtrip">
        <input
          name="Direct"
          type="hidden"
          id="hdnDirectIndirect"
          defaultValue="off"
        />
        <input
          name="Airline"
          type="hidden"
          id="hdnAirlineCode"
          defaultValue="All"
        />
        <input
          name="FlightUniqueId"
          type="hidden"
          id="hdnFlightUniqueCode"
          defaultValue="9df1299f-ad94-4957-adbd-7a5f587a153c"
        />
        <input name="MCSector_2" type="hidden" id="hdnMC_Sec_2" defaultValue="" />
        <input
          name="TripType"
          type="hidden"
          id="hdnTripTypeCode"
          defaultValue={oneWay ? 2: 1}
        />
        <div className="f-tabs lsn">
          <div className="searchSec"   onClick={()=> setSrcClickedToggle(true) }>
            <span>From</span>
            <div className="SearchOverlay txtOriginCodeOverlay"
              
             style={{zIndex: srcClickedToggeled ||srcClickedSearchFlightToggeled? 11 : -1, opacity: srcClickedToggeled ||srcClickedSearchFlightToggeled?  1 : 0,
             
             }}
             >
              <h4 className="g-orange" >
                Origin
                <a href="" className="close-ol" onClick={()=>{
                  setSrcClickedToggle(false);
                  setSrcClickedSearchFlightToggle(false)
                } 

                } >
                  x
                </a>
              </h4>
              <input
                id="txtOriginCode"
                type="text"
                className="ui-autocomplete-input"
                autoComplete="off"
                onkeypress="return isCharWithSpaceHyphen(event)"
                defaultValue=""
                required=""
                placeholder="Enter Origin City / Airport"
               
              
              />
              <i
                className="fa fa-times-circle demo-label"
                style={{ display: "none" }}
              />
            </div>
            <input
              type="text"
              className="txtOriginCode"
              defaultValue=""
              autoComplete="off"
              required=""
              placeholder="Airport"
            />
            <input name="OriginCode" type="hidden" id="hdnOriginCode"
           
             value={OriginCode}
             onChange={handleOnChange} />
            <span
              id="spanOriginCityName"
              style={{ display: "none" }}
              className="spanCity"
            />
            <span
              id="spnOriginErrMsg"
              className="error-message"
              style={{ display: "none" }}
              
            >
              Please select origin
            </span>
          </div>
          <div className="full searchSec" onClick={()=> setSrcClickedToToggle(true) }>
            <span>To</span>
            <div className="SearchOverlay txtDestCodeOverlay"
             style={{zIndex: srcClickedToToggeled ? 11 : -1, opacity: srcClickedToToggeled ?  1 : 0}}>
              <h4 className="g-orange">
                Destination
                <a href="" className="close-ol" onClick={()=> setSrcClickedToToggle(false) }>
                  x
                </a>
              </h4>
              <input
                id="txtDestCode"
                type="text"
                className="ui-autocomplete-input"
                autoComplete="off"
                onkeypress="return isCharWithSpaceHyphen(event)"
                defaultValue=""
                required=""
                placeholder="Enter Destination City / Airport"
              />
              <i
                className="fa fa-times-circle demo-label"
                style={{ display: "none" }}
              />
            </div>
            <input
              type="text"
              className="txtDestCode"
              defaultValue=""
              autoComplete="off"
              required=""
              placeholder="Airport"
            />
            <input name="DestinationCode" type="hidden" id="hdnDestinationCode" />
            <span
              id="spanDestCityName"
              style={{ display: "none" }}
              className="spanCity"
            />
            <span
              id="spnDestErrMsg"
              className="error-message"
              style={{ display: "none" }}
            >
              Please select destination
            </span>
          </div>
        </div>
        {/*DATE Start*/}
        <div className="f-tabs dte">
          <div className={`searchSec Date ${oneWay ? "oneway" : ""}`} id="divDepartSecton" onClick={()=>{
            setSrcClickedDepartToggle(true);
           
          }}>
            <span>Depart</span>
            <input
              type="text"
              id="txtDepartDate"
              name="DepDate"
              className="date"
              placeholder="Select"
              readOnly="readonly"
            />
            <span
              id="spnDepDateErrMsg"
              className="error-message"
              style={{ display: "none" }}
            >
              Select depart date
            </span>
            <span
              id="txtDepartDate_DAY"
              style={{ display: "none" }}
              className="dd"
            >
              Day
            </span>
          </div>
          <div
            className="searchSec Date"
            id="divReturnSection"
            style={{ display: !oneWay ? "inline" : "none" }
          } onClick={()=>{
            setSrcClickedReturnToggle(true);
           
          }}
          >
            <span>Return</span>
            <input
              type="text"
              id="txtReturnDate"
              name="RetDate"
              className="date"
              placeholder="Select"
              readOnly="readonly"
            />
            <span
              id="spnRetDateErrMsg"
              className="error-message"
              style={{ display: "none" }}
            >
              Select return date
            </span>
            <span
              id="txtReturnDate_DAY"
              style={{ display: "none" }}
              className="dd"
            >
              Day
            </span>
          </div>
        </div>
        <div className="f-tabs clspsgr">
          <div className="travel searchSec " onClick={()=>{
            setSrcClickedTravellersToggle(true);
          }}>
            <span>Travelers</span>
            <div className="traveldetails">
              <div>
                <p id="txtPassengersAdt">01</p>
                <p id="txtPassengersChd">00</p>
                <p id="txtPassengersIns">00</p>
                <p id="txtPassengersInl">00</p>
              </div>
              <div>
                <small>Adult</small>
                <small>Child</small>
                <small>
                  INF<span>(on seat)</span>
                </small>
                <small>
                  INF<span>(on lap)</span>
                </small>
              </div>
            </div>
          </div>
          <div className="searchSec classP"  onClick={()=>{
            setSrcClickedCoachToggle(true);
          }}>
            <span>Class</span>
            <p id="txtClassType">Coach</p>
          </div>
        </div>
        <div className="smbtbtn" onClick={()=>{
            setSrcClickedSearchFlightToggle(true);
          }}>
          <button
            type="button"
            style={{ display: "" }}
            className=""
            id="BtnSearchFare_RTOW_Deal"
           onClick={ handleOnSubmit}
          >
            Search Now
          </button>
          <button type="button" onClick={()=>{
            setSrcClickedSearchFlightToggle(true);
           
          }}  className="" id="BtnSearchFare_RTOW"
        >
            Search Flights
          </button>
        </div>
      </div>
      <span className="advance ">
        <a className="lnk_RUHUS_advanceSearch" href="javascript:void(0);">
          Advanced Search (+)
        </a>
      </span>
      <span className="Mumnr">
        <a
          href="javascript:;"
          style={{ color: "#000" }}
          className="lnkUMNR_RUHUS"
        >
          Unaccompanied Minor
        </a>
      </span>
      <div className="advance_ruhus_SearchHolder">
        <ul>
          <li>
            <input
              id="txt_RUHUS_PreferredAirlines"
              type="text"
              autoComplete="off"
              onkeypress="return OnlyCharNumberKey(event)"
              required=""
              placeholder="Preferred Airline"
              name="PreferredAirlineName"
            />
            <input
              name="PreferredAirline"
              type="hidden"
              id="hdn_RUHUS_PreferredAirline"
            />
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                id="chk_RUHUS_DirectFlight"
                onclick="Check_RUHUS_DirectFlight()"
                defaultValue="Direct"
              />{" "}
              <span> Non-Stop</span>
            </label>
          </li>
        </ul>
      </div>
      <div
        className="widget-form"
        id="Tp_multicity"
        style={{ display: "none" }}
      ></div>
      <div className="" id="divUnaccompaniedMinorPopup">
        <a className="linkUnaccompaniedMinorClose">x</a>
        <div>
          Flight tickets for an unaccompanied minor are not available online. To
          book a flight for a UMNR, directly reach out to our experts at{" "}
          <strong style={{ fontWeight: "bold" }}>1-833-914-2482</strong>. For more
          details, <a href="/unaccompanied-minor">READ HERE</a>.
        </div>
      </div>
      {/*Passenger-*/}
      <div
        id="divPassengerDDL"
        className="overhdng pasenger-popup"
        
        style={{ display: srcClickedTravellersToggeled?"":"none" }}
      >
        <h4 className="g-orange">Select Travelers</h4>
        <div className="">
          <div className="divPassengerPanel">
            <div className="divPassenger">
              <div className="divPassengerType">
                <p>Adult</p>
                <span>(18+ yrs)</span>
              </div>
              <div className="divPassengerCount">
                <div className="Add_Less_Passenger">
                  <div className="MinusPassenger">
                    <input
                      type="button"
                      defaultValue="-"
                      className="MinusPassengerBox"
                      field="quantity"
                      onclick="UpdatePassengerCount(2,'ADT',1)"
                    />
                  </div>
                  <div className="PassengerCount">
                    <input
                      type="text"
                      defaultValue={1}
                      className="CountPassengerBox"
                      name="AdultPaxCount"
                      id="txtAdultPassenger"
                      readOnly=""
                    />
                  </div>
                  <div className="PlusPassenger">
                    <input
                      type="button"
                      defaultValue="+"
                      className="PlusPassengerBox"
                      field="quantity"
                      onclick="UpdatePassengerCount(1,'ADT',1)"
                    />
                  </div>
                  <div className="ClearPassengerCount" />
                </div>
              </div>
            </div>
            <div className="divPassenger">
              <div className="divPassengerType">
                <p>Children</p>
                <span>(2 - 11 yrs)</span>
              </div>
              <div className="divPassengerCount">
                <div className="Add_Less_Passenger">
                  <div className="MinusPassenger">
                    <input
                      type="button"
                      defaultValue="-"
                      className="MinusPassengerBox"
                      field="quantity"
                      onclick="UpdatePassengerCount(2,'CHD',1)"
                    />
                  </div>
                  <div className="PassengerCount">
                    <input
                      type="text"
                      defaultValue={0}
                      className="CountPassengerBox"
                      name="ChildPaxCount"
                      paxtype="CHD"
                      id="txtChildPassenger"
                      readOnly=""
                    />
                  </div>
                  <div className="PlusPassenger">
                    <input
                      type="button"
                      defaultValue="+"
                      className="PlusPassengerBox"
                      field="quantity"
                      onclick="UpdatePassengerCount(1,'CHD',1)"
                    />
                  </div>
                  <div className="ClearPassengerCount" />
                </div>
              </div>
            </div>
            <div className="divPassenger">
              <div className="divPassengerType">
                <p>Infant (on lap)</p>
                <span>(Below 2 yrs)</span>
              </div>
              <div className="divPassengerCount">
                <div className="Add_Less_Passenger">
                  <div className="MinusPassenger">
                    <input
                      type="button"
                      defaultValue="-"
                      className="MinusPassengerBox"
                      field="quantity"
                      onclick="UpdatePassengerCount(2,'INFL',1)"
                    />
                  </div>
                  <div className="PassengerCount">
                    <input
                      type="text"
                      defaultValue={0}
                      className="CountPassengerBox"
                      name="InfantLapPaxCount"
                      paxtype="INF"
                      id="txtInfantPassenger"
                      readOnly=""
                    />
                  </div>
                  <div className="PlusPassenger">
                    <input
                      type="button"
                      defaultValue="+"
                      className="PlusPassengerBox"
                      field="quantity"
                      onclick="UpdatePassengerCount(1,'INFL',1)"
                    />
                  </div>
                  <div className="ClearPassengerCount" />
                </div>
              </div>
            </div>
            <div className="divPassenger">
              <div className="divPassengerType">
                <p>Infant (on seat)</p>
                <span>(Below 2 yrs)</span>
              </div>
              <div className="divPassengerCount">
                <div className="Add_Less_Passenger">
                  <div className="MinusPassenger">
                    <input
                      type="button"
                      defaultValue="-"
                      className="MinusPassengerBox"
                      field="quantity"
                      onclick="UpdatePassengerCount(2,'INFS',1)"
                    />
                  </div>
                  <div className="PassengerCount">
                    <input
                      type="text"
                      defaultValue={0}
                      className="CountPassengerBox"
                      name="InfantSeatPaxCount"
                      paxtype="INFS"
                      id="txtInfantSeatPassenger"
                      readOnly=""
                    />
                  </div>
                  <div className="PlusPassenger">
                    <input
                      type="button"
                      defaultValue="+"
                      className="PlusPassengerBox"
                      field="quantity"
                      onclick="UpdatePassengerCount(1,'INFS',1)"
                    />
                  </div>
                  <div className="ClearPassengerCount" />
                </div>
              </div>
            </div>
          </div>
          <div className="btsy" onClick={()=> setSrcClickedTravellersToggle(false)}>
            <a className="g-orange" id="btnPassengerDone">
              Done
            </a>
          </div>
        </div>
      </div>
      {/*End passenger*/}
      {/*Class*/}
      <div
        id="divClassTypeDDL"
        className="pasenger-popup overhdng class-mpopup"
        style={{ display: srcClickedCoachToggeled?"":"none" }}
      >
        <h4 className="g-orange">Class</h4>
        <div className="pnlInner">
          <div className="divClassTypePanel">
            <select
              name="CabinClass"
              id="LstCabinClass"
              style={{ display: "none" }}
            >
              <option value={1} selected="">
                Coach
              </option>
              <option value={2}>Premium Economy</option>
              <option value={3}>Business Class</option>
              <option value={4}>First Class</option>
            </select>
            <div className="pnlInner">
              <ul>
                <li id="rdoCabin1" className="active">
                  <span>Coach</span> <span className="act1" />
                </li>
                <li id="rdoCabin2">
                  <span>Premium Economy</span> <span className="" />
                </li>
                <li id="rdoCabin3">
                  <span>Business Class</span> <span className="" />
                </li>
                <li id="rdoCabin4">
                  <span>First Class</span> <span className="" />
                </li>
              </ul>
            </div>
          </div>
          <div className="btsy" onClick={()=> setSrcClickedCoachToggle(false)}>
            <a className="g-orange" id="btnClassTypeDone">
              Done
            </a>
          </div>
        </div>
      </div>
      {/*End Class*/}
    </form>
    {/* New Calander */}
    <div className="calanderoverly"
     style={{ display: srcClickedDepartToggeled||srcClickedReturnToggeled?"block":"none" }}>
      <h4 className="g-orange">
        <span>When are you departing?</span>
        <a
          href="javascript:;"
         
          className="close-ol-flight"
          onClick={()=>{
            setSrcClickedReturnToggle(false)         
            setSrcClickedDepartToggle(false);
          }}
        >
          x
        </a>
      </h4>
      <div className="seletDate-Wrap">
        <div className="departs__wrap" onclick="departWrapperClick()">
          <span className="f13">Depart</span>
          <span className="selectDates-Txt">
            <span className="txt-date" id="spanDepartDateCaption">
              Select Date
            </span>
            <span className="datevalue" id="spanDepartDateValue">
              <strong id="spanDepartDateValue_DD">25</strong>
              <span>
                <sub id="spanDepartDateValue_MMM">Feb</sub>
                <sup id="spanDepartDateValue_DAY">Thu</sup>
              </span>
            </span>
          </span>
        </div>
        <div className="returns__wrap" onclick="returnWrapperClick()">
          <span className="f13">Return</span>
          <span className="selectDates-Txt">
            <span className="txt-date" id="spanReturnDateCaption">
              Date
            </span>
            <span className="datevalue" id="spanReturnDateValue">
              <strong id="spanReturnDateValue_DD">25</strong>
              <span>
                <sub id="spanReturnDateValue_MMM">Feb</sub>
                <sup id="spanReturnDateValue_DAY">Thu</sup>
              </span>
            </span>
          </span>
        </div>
      </div>
      <div className="calendar-container">
          <CustomCalendar />
        </div>
      

    </div>
    {/* End New Calander */}
  </div>

}
export default FlightForm;