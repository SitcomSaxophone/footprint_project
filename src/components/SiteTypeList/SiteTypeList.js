import React, { Component } from 'react';
import SiteTypeItem from '../SiteTypeItem/SiteTypeItem';
import { connect } from 'react-redux';

class SiteTypeList extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_SITE_TYPES'});   
    }

    selectSite = (site) => {
        console.log('clicked site', site);
        this.props.dispatch({type: 'SET_SELECTED_SITE', payload: site});
    }

    render() {
        return (
            <div>
                <h1>Choose Site Type</h1>
                <select>
                    <option value=''>---Select A Site---</option>
                    {this.props.siteTypes.map(site => {
                        return <option value={site.id} key={site.id}>
                            {site.type}
                        </option>
                        }
                    )}
                    
                </select>
                {this.props.siteTypes.map(site => {
                    return  <SiteTypeItem 
                                site={site}
                                key={site.id}
                                selectSite={this.selectSite}
                            />
                    }      
                )}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        siteTypes: state.siteTypes,
    }
}

export default connect(mapStateToProps)(SiteTypeList);