import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    button: {
        width: '100%',
        margin: 'auto',
    },
    cardDiv: {
        marginTop: '5%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    card: {
        width: '20vmin',
        height: '30vmin',
        margin: 10,
    },
    media: {
        height: '15vmin',
    },
});

class UserDashboard extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_PROJECTS', payload: { id: this.props.user.id } });
    }

    render() {


        const { classes } = this.props;

        return (

            <div>
                <h1 className="heading">Dashboard</h1>
                <h2 className="subHeading">Projects</h2>
                <div>
                    {!this.props.projects ? <p>loading...</p> :
                        <div>

                        </div>}
                    <div className={classes.cardDiv}>
                        {this.props.projects.map(project =>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    image="http://vibrance.co/clarity/img/Project-Icon.png"
                                    title="Generic Project"
                                />
                                <CardContent>
                                    <Typography variant="h6">
                                        {project.name}
                                    </Typography>
                                    <br />
                                    <Typography>
                                        {project.country}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <div className={classes.button}>
                                        <Button
                                            size="large"
                                            variant="outlined"
                                            color="secondary"
                                            // onClick={() => this.props.selectSite(this.props.site)}
                                        >
                                            Select Project
                                        </Button>
                                    </div>
                                </CardActions>
                            </Card>
                        )}
                    </div>


                </div>

            </div>

        );
    }
}

const mapStateToProps = state => ({
    state: state,
    user: state.user,
    projects: state.projectsReducer,
});

UserDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(UserDashboard));