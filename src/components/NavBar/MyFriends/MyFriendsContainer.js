import {connect} from "react-redux";
import MyFriends from "./MyFriends";

let mapStateToProps = (state) => {
    return {users: state.usersPage.users}
};

let MyFriendsContainer = connect(mapStateToProps)(MyFriends);

export default MyFriendsContainer;