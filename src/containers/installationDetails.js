import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { installationSelector } from "../reducers/selectedInst";



class InstallationDetail extends React.Component {
    render(){
        const { id } = this.props;
        return (
            <div className='installation-details'>
                {id}
            </div>
        );
    };
};

InstallationDetail.propTypes = {
    id: PropTypes.number,

};


const mapDispatchToProps = ({

});

const mapStateToProps = state => ({
    id: installationSelector(state),
})


export default connect(mapStateToProps, mapDispatchToProps)(InstallationDetail);