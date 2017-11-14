import React, { Component } from 'react';
import TodoItem from './TodoItem';
import { Text, View, StyleSheet } from 'react-primitives';
import DoneIcon from './components/Icons/DoneIcon';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

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
const API_URL = '/api';

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
  },
  layout: {
    maxWidth: 500,
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  congrats: {
    marginTop: 30,
    padding: 10,
    fontSize: 18,
    lineHeight: 18,
    backgroundImage: 'linear-gradient( to right, #FFB6B2, #FFBFA8)',
    boxShadow: '0px 0px 15px -4px #FFBFA8',
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  congratsText: {
    marginLeft: 10,
  },
});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todoitems: [],
      done: [],
    };
  }

  componentDidMount() {
    this.getTodoItems()
    .then(res => {
      const done = [];
      res.forEach((element) => {
        done.push({id: element.id, checked:false});
      });
      this.setState({todoitems: res, done});
    })
    .catch(err => console.error(err))
  }

  getTodoItems() {
    return new Promise( (resolve, reject) => {
        const request = new XMLHttpRequest();
        const url = API_URL + '/api/todos';
        request.open('GET', url, true);
        request.onloadend = () => {
            if(request.readyState === 4 && request.status === 200) {
                resolve(JSON.parse(request.response));
            }
        };
        request.onerror = () => {
            reject(new Error("Error getting data"));
        };
        request.send(null);
    });
  }

  toggle(id, checked) {
    const { done } = this.state;
    for(let i = 0, len = done.length; i < len; i++) {
      if (done[i].id === id) {
        done[i].checked = checked;
        break;
      }
    }
    this.setState({ done });
  }

  allChecked() {
    const { done } = this.state;
    for(let i = 0, len = done.length; i < len; i++) {
      if (!done[i].checked) {
        return false;
      }
    }
    return true;
  }

  render() {
    return (
      <View style={styles.body}>
        <View style={styles.layout}>
          <View style={styles.header}>
            <Text style={styles.title}>React Map view IS NOT NICE MAN</Text>
            <MyMapComponent isMarkerShown />// Map with a Marker
          </View>
          <View style={styles.list}>
            {this.state.todoitems.map((el, index) => {
              return(
                <TodoItem
                  key={el.id}
                  todoId={el.id}
                  text={el.text}
                  toggle={(id, checked) => this.toggle(id, checked)}
                />
              )
            })}
          </View>
          { this.allChecked() &&
            <View style={styles.congrats}>
              <DoneIcon checked size={18} fill="white"/>
              <Text style={styles.congratsText}>You are the Amazingness</Text>
            </View>
          }
        </View>
      </View>
    );
  }
}

export default App;
