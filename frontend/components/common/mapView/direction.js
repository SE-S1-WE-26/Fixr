export async function  getDirection( from , to) {
    const response = await fetch(

        `https://api.mapbox.com/directions/v5/mapbox/driving/${from[0]},${from[1]};${to[0]},${to[1]}?alternatives=false&annotations=distance%2Cduration&geometries=geojson&overview=full&steps=false&access_token=pk.eyJ1IjoiamFrYWRwIiwiYSI6ImNtMWxvZWozNjBhZHQya3M4NTBpZm93c3YifQ.jbGHVjEN5SxeSbWbn8VMiw`
    );

    const json = await response.json();
    console.log(json)
    const route = json;
    return route;
}