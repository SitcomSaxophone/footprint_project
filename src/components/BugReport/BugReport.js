import React, { Component } from 'react';
import './BugReport.css';
import FloatingModal from '../FloatingModal/FloatingModal';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import axios from 'axios';

class BugReport extends Component {

  state = {
    reportBugOpen: false,
    snackbarOpen: false,
    name: '',
    email: '',
    message: '',
  };

  handleChangeFor = propertyName => event => {
    this.setState({
      // saves whatever state previously was and only changes current TextField
      ...this.state,
      [propertyName]: event.target.value
    });
  };

  handleReportBugToggle = () => {
    this.setState({
      ...this.state,
      reportBugOpen: !this.state.reportBugOpen,
      contactExpertOpen: false,
    });
  };

  handleClose = () => this.setState({ ...this.state, contactExpertOpen: false, reportBugOpen: false });

  handleSubmit = property => event => {
    event.preventDefault();
    axios.post('/email', {
      content: { name: this.state.name, email: this.state.email, subject: property, message: this.state.message },
      siteName: this.props.sites.length ? this.props.sites[0].siteName : 'Not entered',
      fundStartDate: this.props.sites.length ? this.props.sites[0].fundStartDate : 'Not entered',
      fundEndDate: this.props.sites.length ? this.props.sites[0].fundEndDate : 'Not entered',
      location: this.props.sites.length ? this.props.sites[0].location : 'Not entered',
      generator: this.props.generator.length ? this.props.generator[0] : 'Not entered',
      selectedSite: this.props.selectedSite.type,
      totalDieselCost: this.props.dieselCalculation.totalDieselCost || 0,
      address: this.props.sites.length ? this.props.sites[0].address : 'Not entered',
    }).then(response => {
      console.log('Response is:', response.data);
      this.setState({
        name: '',
        email: '',
        message: '',
        snackbarOpen: true,
        reportBugOpen: false,
      });
    }).catch(error => console.log('Error in POST:', error));
  }

  render() {
    return (
      <div className="bugReport">
        <FloatingModal
          buttonText="Report A Bug"
          color="secondary"
          title="Please complete the following fields to report a bug to the Footprint Project team."
          state={this.state}
          modalOpen={this.state.reportBugOpen}
          handleModalToggle={this.handleReportBugToggle}
          handleChangeFor={this.handleChangeFor}
          handleSubmit={this.handleSubmit}
          handleClose={this.handleClose}
          subject="Bug Report"
        />
        <Snackbar
          open={this.state.snackbarOpen}
          message={<span id="message-id">Email Sent</span>}
          autoHideDuration={2000}
          onClose={() => this.setState({ snackbarOpen: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
    sites: state.sites,
    selectedSite: state.selectedSite,
    dieselCalculation: state.dieselCalculation,
    generator: state.generator
})

export default connect(mapStateToProps)(BugReport);