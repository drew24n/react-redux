import {connect} from "react-redux";
import MyPosts from "./MyPosts";
import {addPostAC} from "../../../redux/profile-reducer";

let mapStateToProps = (state) => {
    return {
        postItems: state.profile.postItems,
        picture: state.profile.userProfile.photos.small,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (post) => dispatch(addPostAC(post)),
    }
};

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;