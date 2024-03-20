export const CustomLayout = ({ isLogged }) => {
    const onUnAuth = () => {
        localStorage.setItem('loginRedirect', this.props.location.pathname)
        return "Chưa đăng nhập";
    };

    return isLogged ? <></> : onUnAuth();

};