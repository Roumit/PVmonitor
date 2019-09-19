import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { installationSelector } from "../reducers/selectedInst";
import { installationsSelector } from "../reducers/installationsVRM";

// function FilterIdSite(props) {
//     const { id, instData } = props;
//     console.log(instData);
//     const choosenSite = JSON.stringify(instData.data.records);
//     return (
//         <div>
//             {choosenSite}
//         </div>
//     );
// };


class InstallationDetail extends React.Component {
    render(){
        const { id, instData } = this.props;
        // console.log(instData);
        if (instData.data.success) {
            return (
                <div className='installation-details'>
                    {/* <FilterIdSite
                    id={id}
                    instData={instData}
                    /> */}
                </div>
            );
        }
        return null;
    };
};

InstallationDetail.propTypes = {
    id: PropTypes.number,
    instData: PropTypes.object

};


const mapDispatchToProps = ({

});

const mapStateToProps = state => ({
    id: installationSelector(state),
    instData: installationsSelector(state),
})


export default connect(mapStateToProps, mapDispatchToProps)(InstallationDetail);
