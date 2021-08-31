import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import KonfiIcon from "@/components/KonfiIcon";
import KonfiIconGrey from "@/components/KonfiIconGrey";

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        values: {
            konfi: {
                component: KonfiIcon,
            },
            konfi_grey:{
                component: KonfiIconGrey
            },
        },
    },
});
