import {connect} from "react-redux";
import ProfileInfo from "./ProfileInfo";

let mapStateToProps = (state) => {
    return {user_info: state.profile.user_info}
};

let ProfileInfoContainer = connect(mapStateToProps)(ProfileInfo);

export default ProfileInfoContainer;