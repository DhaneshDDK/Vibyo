const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

const Routes = {
    Auth: {
        Login: `${serverURL}/api/auth/login`,
        Register: `${serverURL}/api/auth/register`,
        Remove: `${serverURL}/api/auth/remove`,
        verifyToken: `${serverURL}/api/auth/verifyToken`,
        resendOTP: `${serverURL}/api/auth/resendOTP`,
        verifyOTP: `${serverURL}/api/auth/verifyOTP`,
        updateProfile: `${serverURL}/api/auth/updateProfile`,
    },
    Topics: {
        GetAllTopics: `${serverURL}/api/topics/getAllTopics`,
        GetTopicById: `${serverURL}/api/topics/getTopicById`,
        CreateTopic: `${serverURL}/api/topics/createTopic`,
        UpdateTopic: `${serverURL}/api/topics/updateTopic`,
        DeleteTopic: `${serverURL}/api/topics/deleteTopic`
    }
}

export default Routes;