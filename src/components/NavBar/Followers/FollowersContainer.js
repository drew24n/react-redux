import {connect} from "react-redux";
import Followers from "./Followers";

let mapStateToProps = (state) => {
    return {users: state.usersPage.users}
};

let FollowersContainer = connect(mapStateToProps)(Followers);

export default FollowersContainer;