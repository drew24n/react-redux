import React from "react"
import Preloader from "../components/common/preloader/preloader"

export const withSuspense = (Component) => (props) => {
    return <React.Suspense fallback={<Preloader/>}>
        <Component {...props}/>
    </React.Suspense>
}

//temporarily not being used