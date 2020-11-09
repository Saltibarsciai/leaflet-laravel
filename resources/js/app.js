import './bootstrap';
import store from './store/store'
import {createApp} from 'vue'
import L from 'leaflet';
import Content from "./store/module";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

import App from './App.vue'
const app = createApp(App);
app.use(store);
app.use(L);
app.mount('#app');


