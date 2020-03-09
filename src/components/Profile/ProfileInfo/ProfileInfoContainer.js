import {connect} from "react-redux";
import ProfileInfo from "./ProfileInfo";

let mapStateToProps = (state) => {
    return {userInfo: state.profile.userInfo}
};

let ProfileInfoContainer = connect(mapStateToProps)(ProfileInfo);

export default ProfileInfoContainer;