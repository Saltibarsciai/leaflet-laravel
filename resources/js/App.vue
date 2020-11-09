<template>
    <div style="height: 60vh; width: 50vw;">
        <l-map
            style="height: 500px;"
            ref="map"
            :zoom="zoom"
            :center="center"
            @update:zoom="zoomUpdated"
            @ready="ready"
        >
            <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ></l-tile-layer>
            <l-marker
                :ref="'markerPoi' + marker.id"
                name="poi-list-item"
                v-for="marker in markerData"
                :icon="defaultMarkerIcon"
                :key="'poi' + marker.id"
                :lat-lng="[marker.address_gps_lat, marker.address_gps_lon]"
            ></l-marker>
            <l-marker
                name="accos-list-item"
                :ref="'mapMarker' + marker.id"
                v-for="marker in markerDataAccos"
                :icon="currentAccoIcon"
                :key="'acco' + marker.id"
                :lat-lng="[marker.address_gps_lat, marker.address_gps_lon]"
            >
                <l-popup class="leaflet-popup-component">
                    <div>{{marker.address_gps_lat}}</div>
                </l-popup>
            </l-marker>
            <l-marker
                name="accos-list-item"
                :ref="'mapMarker' + 50"
                :key="'current-accommodation'"
                :lat-lng="[center[0], center[1]]"
            >
                <l-popup class="leaflet-popup-component">
                    {{zoom}}
                </l-popup>
            </l-marker>
        </l-map>
        <button @click="boundsUpdated(1)">shuffle</button>
    </div>
</template>

<script>
    import L from 'leaflet';
    import {LMap, LTileLayer, LMarker, LPopup, LIcon} from '@vue-leaflet/vue-leaflet';
    import "leaflet/dist/leaflet.css";

    export default {
        name: "App",
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup,
            LIcon,
        },
        data() {
            return {
                zoom: 7,
                center: [50.5, 5.5],

                defaultMarkerIcon: L.icon({
                    iconUrl: 'e.jpg',
                    iconSize: [51, 58],
                }),
                currentAccoIcon: L.icon({
                    iconUrl: 'g.jpg',
                    iconSize: [51, 58],
                }),
                markerData: [],
                markerDataAccos: [],
                markers: [],
            }
        },
        methods: {
            zoomUpdated(zoom) {
                this.zoom = zoom
            },
            centerUpdated(center) {
                this.center = center;
            },
            ready() {
                this.map = this.$refs.map.leafletObject;
                L.control.scale().addTo(this.map);
                L.control.zoom({position: 'topright'}).addTo(this.map);
                this.map.scrollWheelZoom.disable();
                this.map.zoomControl.remove();

                this.map.on('popupclose', () => {
                    this.defaultMarkerIcon = L.icon({
                        iconUrl: 'e.jpg',
                        iconSize: [51, 58],
                    });
                    this.currentAccoIcon = L.icon({
                        iconUrl: 'g.jpg',
                        iconSize: [51, 58],
                    })
                });
                this.boundsUpdated(this.map.getBounds(), this.zoom - 3);
                this.map.on('dragend', () => {
                    this.boundsUpdated(this.map.getBounds(), this.zoom - 3);
                });
                this.map.on('zoomend', () => {
                    this.boundsUpdated(this.map.getBounds(), this.zoom - 3);

                });
            },
            boundsUpdated(bounds, zoom = this.zoom) {
                this.getPois(bounds, zoom);
                this.getAccommodations(bounds);
            },
            getAccommodations(bounds) {
                console.log('get accos')
                setTimeout(() => {
                    this.markerDataAccos = this.randArray()
                }, 1000)
            },
            getPois(bounds, zoom = this.zoom) {
                console.log('getpois');
                setTimeout(() => {
                    this.markerData = this.randArray()
                }, 1000)
            },
            randArray() {
                return [
                    {
                        id: Math.floor(Math.random() * 5000),
                        address_gps_lat: ((Math.random()) * 3 + 49).toFixed(2),
                        address_gps_lon: Math.floor(Math.random()) + 5
                    },
                    {
                        id: Math.floor(Math.random() * 5000),
                        address_gps_lat: ((Math.random()) + 49).toFixed(2),
                        address_gps_lon: ((Math.random()) * 2 + 5).toFixed(2)
                    },
                    {
                        id: Math.floor(Math.random() * 5000),
                        address_gps_lat: ((Math.random()) + 49).toFixed(2),
                        address_gps_lon: Math.floor(Math.random()) + 5
                    },
                    {
                        id: Math.floor(Math.random() * 5000),
                        address_gps_lat: ((Math.random()) + 49).toFixed(2),
                        address_gps_lon: ((Math.random()) * 2 + 5).toFixed(2)
                    }
                ]
            }
        }
    }
</script>

<style scoped>

</style>
