import React, {Suspense} from "react";
import Preloader from "../common/Preloader/Preloader";

export const withLazyLoading = (Component) => (props) => {
    return <Suspense fallback={<Preloader/>}>
        <Component {...props}/>
    </Suspense>
};
