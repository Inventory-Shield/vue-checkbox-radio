<style lang="scss">
    .radio-component {
        > input {
            opacity: 0;
            position: absolute;

            + label > .input-box {
                display: inline-block;
                border: 1px solid #000;
                border-radius: 50%;
                margin: 0;
                padding: 0;
                width: 1em;
                height: 1em;
                background: #fff;
                overflow: hidden;
                vertical-align: -5%;
                user-select: none;

                > .input-box-circle {
                    display: block;
                    margin: 50%;
                    width: 0%;
                    height: 0%;
                    background: #000;
                    border-radius: 50%;
                    opacity: 0;
                    transition: width 0.15s ease-in, height 0.15s ease-in, margin 0.15s ease-in;
                }
            }

            &:checked + label > .input-box > .input-box-circle {
                opacity: 1;
                margin: 22%;
                width: 56%;
                height: 56%;
            }

            &:focus + label > .input-box {
                box-shadow: 0 0 2px 3px #73b9ff;
            }

            &:disabled + label {
                opacity: 0.7;
            }
        }
    }
</style>

<template>
    <div class="radio-component">
        <input type="radio"
               :id="id"
               :name="name"
               :value="value"
               :class="className"
               :required="required"
               :disabled="disabled"
               @change="onChange"
               :checked="state">
        <label :for="id">
            <slot name="input-box">
                <span class="input-box">
                    <span class="input-box-circle"></span>
                </span>
            </slot>
            <slot></slot>
        </label>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import type { PropType } from 'vue';

    export default defineComponent({
        props: {
            id: {
                type: String,
                default: function () {
                    return 'radio-id-' + Math.random() * 300;
                },
            },
            name: {
                type: String as PropType<string | null>,
                default: null,
            },
            value: {
                default: '',
            },
            modelValue: {
                default: undefined,
            },
            className: {
                type: String as PropType<string | null>,
                default: null,
            },
            checked: {
                type: Boolean,
                default: false,
            },
            required: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            model: {}
        },

        emits: ['update:modelValue'],

        computed: {
            state(): boolean {
                if (this.modelValue === undefined) {
                    return this.checked;
                }

                return this.modelValue === this.value;
            }
        },

        methods: {
            onChange(): void {
                this.toggle();
            },

            toggle(): void {
                this.$emit('update:modelValue', this.state ? '' : this.value);
            }
        },

        watch: {
            checked(newValue: boolean) {
                if (newValue !== this.state) {
                    this.toggle();
                }
            }
        },

        mounted() {
            if (this.checked && !this.state) {
                this.toggle();
            }
        },
    });
</script>
