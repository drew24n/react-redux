import React, {ComponentType, Suspense} from "react"
import Preloader from "../components/common/preloader/preloader"

export const withSuspense = <T extends object>(Component: ComponentType<T>) => (props: T) => {
    return <Suspense fallback={<Preloader/>}>
        <Component {...props}/>
    </Suspense>
}

//temporarily not being used