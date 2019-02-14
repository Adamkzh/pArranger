import React, { Component } from 'react';
import Header from './Header';
import { Search, Grid, Segment } from 'semantic-ui-react'
import _ from 'lodash';
import faker from 'faker'



const source = _.times(10, () => ({
    title: faker.address.streetAddress(),
    image: faker.image.image(),
    description: faker.address.latitude() + ", " +faker.address.longitude(),
}))


class SearchContent extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        this.resetComponent()
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })
    
        setTimeout(() => {
          if (this.state.value.length < 1) return this.resetComponent()
    
          const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
          const isMatch = result => re.test(result.streetaddress)
          this.setState({
            isLoading: false,
            results: _.filter(source, isMatch),
          })
        }, 300)
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

    handleResultSelect = (e, { result }) => this.setState({ value: result.streetaddress });

    render(){
        const { isLoading, value, results } = this.state;
        console.log(results);
        return(
            <div>
                <Header />
                <Grid>
                    <Grid.Column width={6}>
                    <Search
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                        results={results}
                        value={value}
                    />
                    </Grid.Column>
                    <Grid.Column width={10}>
                    <Segment>
                        <h1>State</h1>
                        <pre style={{ overflowX: 'auto' }}>{JSON.stringify(this.state, null, 2)}</pre>
                        <h1>Options</h1>
                        <pre style={{ overflowX: 'auto' }}>{JSON.stringify(source, null, 2)}</pre>
                    </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default SearchContent;   