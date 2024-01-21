import NotList from "../components/notificationContent/notList";


const Notification = () => {

    return(
        <>
            <h2 className="font-bold text-[1.4rem] mb-3">Notification</h2>
            
                <div className="bg-greyBg">

                <NotList />
            </div>
        </>
    )
}

export default Notification;