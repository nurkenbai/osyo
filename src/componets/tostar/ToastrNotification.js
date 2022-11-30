import React, {useEffect} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastrNotification = ({message}) => {
    if (!message.messageType) return (<p></p>)

        switch (message.messageType) {
            case 'success': {
                return (<>
                        {toast.success(message.message)}

                        <ToastContainer/>
                    </>
                )
            }
                break;
            case 'info': {
                return (<>
                        {toast.info(message.message)}

                        <ToastContainer/>
                    </>
                )
            }
                break;
            case 'error': {
                return (<>
                        {
                        }

                    </>
                )
            }
                break;
            case 'warning': {
                return (<>
                        {toast.warning(message.message)}

                        <ToastContainer/>
                    </>
                )
            }
                break;
        }


    // return (
    //     <div>
    //         <button className="btn btn-success btnspace" onClick={() => toast.success('Success Message')}> Success
    //             Message
    //         </button>
    //         <button className="btn btn-info btnspace" onClick={() => toast.info('Info Message')}>Info Message
    //         </button>
    //         <button className="btn btn-danger btnspace" onClick={() => toast.error('Error Message')}>Error Message
    //         </button>
    //         <button className="btn btn-warning btnspace" onClick={() => toast.warning('Success Message')}>Warning
    //             Message
    //         </button>
    //
    //         <ToastContainer/>
    //     </div>
    // );
};

export default ToastrNotification;