import {connect} from "react-redux";
import MyPosts from "./MyPosts";
import {addPostActionCreator, typingPostActionCreator} from "../../../redux/profile_reducer";

let mapStateToProps = (state) => {
    return {
        user_info: state.profile.user_info,
        post_items: state.profile.post_items,
        picture: state.profile.user_info.picture.path,
        typing: state.profile.write_post,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        typing_post: (current_text) => dispatch(typingPostActionCreator(current_text)),
        add_post: () => dispatch(addPostActionCreator()),
    }
};

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;