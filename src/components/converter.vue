<template>

    <div class="columns converter">
        <div class="column">
            <div class="converter-title">
                <h4 class="subtitle has-text-success is-4">Simulate Conversion</h4>
            </div>

            <form class="converter-form" @submit.prevent="submit">
                <div class="field">
                    <label class="label">Local Currency <span class="has-text-danger">*</span></label>
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select v-model="form.base" required>
                                <option :value="null">Select currency</option>
                                <option v-for="(currency, key) in setCurrencies" :key="key" :value="currency.code">{{ `${currency.code} - ${currency.name}` }}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Currency Conversion <span class="has-text-danger">*</span></label>
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select v-model="form.currency" required>
                                <option :value="null">Select currency</option>
                                <option v-for="(currency, key) in setCurrencies" :key="key" :value="currency.code">{{ `${currency.code} - ${currency.name}` }}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Conversion Value <span class="has-text-danger">*</span></label>
                    <div class="control">
                        <input class="input" min="1" type="number" v-model="form.value" placeholder="Insert a value to convert. Ex:10" @keypress="isNumber()">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Conversion Date</label>
                    <div class="control">
                        <input class="input" type="date" v-model="form.date">
                    </div>
                </div>

                <div class="field">
                    <p class="control">
                        <button type="submit" class="button is-success is-fullwidth">
                        Submit
                        </button>
                    </p>
                </div>
            </form>

            <div class="result" v-if="result">
                <p>Conversion value is </p>
                <div class="has-text-success" style="display: flex; justify-content: center;">
                    <span style="margin-top: 10px; margin-right: 6px;">{{ form.currency }}</span>
                    <h1 class="title has-text-success">{{ result }}</h1>
                </div>

                <div style="margin-top: 20px">
                    <nav class="bd-prev-next-bis" style="font-size: 13px">
                        <a class="bd-prev-next-bis-previous has-text-success" href="#" title="Reverse Conversion" @click.prevent="reshuffle()">
                            <Icon name="reshuffle" style="width: 11px; height: 11px" />
                            Reverse Conversion
                        </a>
                        <a class="bd-prev-next-bis-next has-text-black" href="#" title="Reset" style="margin-left: 5px" @click.prevent="reset()">
                            <Icon name="circle-x" style="width: 11px; height: 11px" />
                            Reset
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from '../Shared/Icon'
import { o_O } from '../Helpers/index.js'
import { converter } from '../Services/converter.js'
import { currencies } from '../Helpers/currencies.js'

export default {
    name: 'Converter',
    components: {Icon},
    data(){
        return{
            currencies: [],
            form: {},
            result: null
        }
    },

    computed:{
        setCurrencies(){
            let arr = Object.values(currencies[0])
            return arr.filter(f => this.currencies.includes(f.code));
        }
    },

    methods:{
        async submit(){
            let [err, data] = await o_O(converter(this.form.base, this.form.date));
            if(err) return console.log(err);
            this.result = (data.data.rates[this.form.currency] * this.form.value).toFixed(2);
        },

        async reshuffle(){
            let base = this.form.base;
            let currency = this.form.currency;
            this.form.base = currency;
            this.form.currency = base;
            await this.submit();
        },

        async setUp(){
            let [err, data] = await o_O(converter('USD'));
            if(err) return console.log(err);
            this.currencies = Object.keys(data.data.rates);
        },

        reset(){
            this.form = {
                base: null,
                currency: null,
                value: 1,
                date: null
            };
            this.result = null;
        },

        isNumber(evt) {
            evt = (evt) ? evt : window.event;
            let charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();;
            } else {
                return true;
            }
        }
    },

    beforeMount(){
        this.setUp();
        this.reset();
    }
}
</script>

<style>
@import '../assets/css/converter.css'
</style>
