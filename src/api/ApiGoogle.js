import axios from 'axios';
import { ENV } from '../utils/constants';

export const getPlaces = async (
    location,
    radius,
    types,
    query,
    region,
    maxResults
) => {
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&types=${types}&keyword=${query}&key=${ENV.APIKEY_PLACE}&region=${region}&maxResults=${maxResults}`
    );
    console.log(response);
    return response.data;
};
export const getPlaceDetails = async (placeId) => {
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${ENV.APIKEY_PLACE}`
    );
    return response.data.result;
};
