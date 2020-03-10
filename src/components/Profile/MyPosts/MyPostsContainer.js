import {connect} from "react-redux";
import MyPosts from "./MyPosts";
import {addPostAC, typePostAC} from "../../../redux/profile-reducer";

let mapStateToProps = (state) => {
    return {
        postItems: state.profile.postItems,
        picture: state.profile.userProfile.photos.small,
        typePost: state.profile.typePost,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        typePostFunc: (text) => dispatch(typePostAC(text)),
        addPost: () => dispatch(addPostAC()),
    }
};

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;