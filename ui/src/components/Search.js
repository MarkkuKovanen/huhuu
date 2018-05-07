import React from 'react';
import {Search as SemanticSearch} from 'semantic-ui-react';
import {_} from 'underscore';
import {withRouter} from 'react-router-dom';

class Search extends React.Component {

    state = {}

    resultSelected = (event, data) => {
        this.props.history.push("/user/" + data.result.username);
    }

    searchChanged = (event, {value}) => {
        if (value.length < 1) {
            this.setState({
                loading: false,
                results: []
            })
            return;
        }

        this.setState({
            loading: true
        });

        let query = {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: "same-origin"
        }

        fetch("/api/search/" + value, query).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    this.setState({
                        results: data,
                        loading: false
                    });
                })
            } else {
                console.log(response.statusText);
            }
        });
    }

    render() {
        return (
            <SemanticSearch results={this.state.results}
                            noResultsMessage={this.props.noResultsMessage}
                            placeholder={this.props.placeholder}
                            onSearchChange={_.debounce(this.searchChanged, 300)}
                            loading={this.state.loading}
                            onResultSelect={this.resultSelected}
            />
        );
    }
}

export default withRouter(Search);
