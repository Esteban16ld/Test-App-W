const urlAPI = 'putUrlTunelHere';

export const getDrivers = async () => {
    const res = await fetch(urlAPI.concat('/api/Drivers/GetDrivers'));
    const data = await res.json();
    return data;
}