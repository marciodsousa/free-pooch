import React, { Component } from 'react';
import  {connect } from 'react-redux';
import { throws } from 'assert';

const mapStateToProps = state => {
    return {results: state.postsBySubreddit.results || []};
}

class ConnectedSearchResultsPanel extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return(
            <div>
                THESE ARE THE LIST RESULTS
                {this.props.results.map(el => (
                    <li className="list-group-item" key={el.id}>
                        {el}
                    </li>
                ))}
            </div>
        )
    }
}

const SearchResultsPanel = connect(mapStateToProps)(ConnectedSearchResultsPanel);

export default SearchResultsPanel;