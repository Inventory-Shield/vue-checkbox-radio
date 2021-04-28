import Checkbox from './components/Checkbox';
import Radio from './components/Radio';

export default {
    install (app) {
        app.component('checkbox', Checkbox);
        app.component('radio', Radio);
    }
}

export { Checkbox, Radio }
