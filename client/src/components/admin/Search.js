import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {
    Button,
    Container,
    Header,
    Menu,
    Segment,
    Input,
    Card,
} from 'semantic-ui-react';

import Detail from './Detail'
import '../../style/Search.css'


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: [],
            viewDetail: false,
            curId: ""
        }
    }


    componentDidMount = () => {
        var id = this.props.match.params.id;
        if (id !== "admin") {
            axios.get('/api/getall', { params: { ID: id } })
                .then((response) => {
                    var data = response.data;
                    data.forEach(element => {
                        var obj = {};
                        obj.header = element.username;
                        obj.meta = element.watts + " W";
                        obj.image = element.mapImage;
                        obj.description = element.address;
                        obj.link = true;
                        obj.raised = true;
                        obj.onClick = this.nailClick;
                        obj.id = element._id;
                        this.setState({
                            item: [...this.state.item, obj]
                        });
                    });

                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }
    };

    nailClick = (element, data) => {
        var id = data.id;
        this.setState({
            curId: id,
            viewDetail: true
        })
    };

    /**
     * Handle keyPress event.
     * Call backend server when 'Enter' key is pressed.
     */
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const value = event.target.value;
            if (value) {
                const searchUsersUrl = "/api/v1/searchUsers?q=" + value;
                axios.get(searchUsersUrl).then(response => {
                    const data = response.data.result.data;
                    if (data) {
                        let searchResultUsers = [];
                        data.forEach(element => {
                            let obj = {};
                            obj.header = element.username;
                            obj.meta = element.watts + " W";
                            obj.image = element.mapImage;
                            obj.description = element.address;
                            obj.link = true;
                            obj.raised = true;
                            obj.onClick = this.nailClick;
                            obj.id = element._id;
                            searchResultUsers.push(obj);
                        });
                        this.setState({
                            item: searchResultUsers
                        });
                    }
                }).catch(error => {console.log(error);});
            }
        }
    };

    render() {
        var dashboardUrl = "/dashboard/";
        if (window.localStorage.getItem('uuid')) {
            dashboardUrl += window.localStorage.getItem('uuid');
        } else {
            dashboardUrl += "admin"
        }

        return (
            <div>
                <Segment
                    inverted
                    textAlign='center'
                    style={{
                        minHeight: 350,
                        padding: '1em 0em',
                        'backgroundImage': 'url(https://earthview.withgoogle.com/download/6101.jpg)',
                        'backgroundRepeat': 'no-repeat',
                        'backgroundSize': 'cover',
                    }}
                    vertical
                >
                    <Menu
                        inverted
                        pointing
                        secondary
                        size='large'
                        style={{
                            'borderWidth': '0px'
                        }}
                    >
                        <Container>
                            <Menu.Item as={Link} to='/'>HOME</Menu.Item>
                            <Menu.Item as={Link} to='/design'>DESIGN</Menu.Item>
                            <Menu.Item as={Link} to={dashboardUrl}>DASHBOARD</Menu.Item>
                            <Menu.Item as={Link} to='/search' active>SEARCH</Menu.Item>
                            <Menu.Item as={Link} to='/console'>CONSOLE</Menu.Item>
                            <Menu.Item position='right'>
                                <Button as={Link} to='/login' inverted>
                                    SIGN IN
                                </Button>
                            </Menu.Item>
                        </Container>
                    </Menu>

                    <Container text>
                        <Header
                            as='h2'
                            content='Search'
                            inverted
                            style={{
                                fontSize: '4em',
                                fontWeight: 'normal',
                                marginBottom: 0,
                                marginTop: '1em',
                            }}
                        />
                        <Input icon='search' placeholder='Press [Enter] to search ...'
                               style={{
                                   marginTop: '1em',
                                   width: '39em'
                               }} onKeyPress={this.handleKeyPress}
                        />
                    </Container>
                </Segment>

                {this.state.viewDetail ?
                    <Detail id={this.state.curId}/> :
                    <Card.Group
                        itemsPerRow={5}
                        centered
                        className="searchSeg"
                        items={this.state.item}
                    >
                    </Card.Group>}
            </div>
        );
    }
}

export default Search;   