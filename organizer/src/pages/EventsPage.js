import React from "react";
import {useSelector} from "react-redux";


function EventsPage() {

    const userStatus = useSelector(state => state.cached_data.App.userAuthorized)

    return (
        <>
            {!userStatus ? <div style={{textAlign: "center", fontSize: "xx-large", fontWeight: 200, color: 'blue'}}>Пожалуйста авторизуйтесь! :)</div>:
                <>
                    <div>Контейнер</div>
                </>
            }
        </>
    )
}

export default EventsPage