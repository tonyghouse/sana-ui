export const handleSlashbarCommands = (value: string) => {

    if (value.startsWith('/auth/')) {
        const authValue = value.substring('/auth/'.length);
        console.log("handling commands ", authValue);
        localStorage.setItem('AuthToken', btoa(authValue));
    }

}