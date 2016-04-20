import React from 'react';
import get from '../utils/ajax';

export default class Plist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            list: []
        }
    }

    componentDidMount() {
        this.setState({firstView: true});
    }

    componentWillReceiveProps(nextProps) {
        let keyword = nextProps.keyword;

        this.setState({
            loading: true,
            firstView: false
        });

        let url = `https://api.github.com/search/users?q=${keyword}`;
        get(url).then(data => {
            this.setState({
                loading: false,
                list: data.items
            });
        }).catch(function(e) {
            console.log(e);
        });
    }

    render() {
        const imgStyle = {width: '50px'};

        if(this.state.firstView) {
            return (
                <h2>Enter name to search</h2>
            );
        }

        if(this.state.loading) {
            return (
                <h2>Loading result...</h2>
            );
        }

        if(this.state.list.length) {
            return (
                 <div className="row">
                    {this.state.list.map(people=>{
                        return (
                            <div className="card">
                                <img src={people.avatar_url} style={imgStyle}/>
                                <p className="card-text">
                                    {people.login}
                                </p>
                            </div>
                        )
                    })}
                </div>
            );
        } else {
            return (
                <h2>No result.</h2>
            );
        }
    }
}














