import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import './searchContent.scss';

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
) 

class SearchContent extends Component {
  constructor() {
    super();
    this.state = {
        searchResults: []
    };
  }

  render() {
    return (
     <div className="searchcontent__container">
        <div className="searchmap__container">
             <MyMapComponent isMarkerShown />
        </div>
        <div className="searchlist__container">
            { this.state.searchResults.length > 0 &&
                <div>
                    bue resultados yo!
                </div>
            }
        </div>
     </div>
    );
  }
}

export default SearchContent;
