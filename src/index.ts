import type { App } from 'vue';
import Checkbox from './components/Checkbox.vue';
import Radio from './components/Radio.vue';

export default {
    install (app: App) {
        app.component('checkbox', Checkbox);
        app.component('radio', Radio);
    }
}

export { Checkbox, Radio }
